import { getProjectId } from './get-project-id';

export function getUrlsForMR(mergeRequestId: string) {
    const projectId = getProjectId();
    const urls: string[] = [];

    return $.ajax(`/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/pipelines`)
        .then(pipelines => pipelines.filter((pipeline: any) => pipeline.status === 'success'))
        .then(pipelines => {
            const promises: Promise<any>[] = [];

            pipelines.forEach((pipeline: any) => {
                const p = $.ajax(`/api/v4/projects/${projectId}/pipelines/${pipeline.id}/jobs`)
                    .then(jobs => jobs.filter((job: any) => job.name.match(/new domain/g)))
                    .then(jobs => {
                        const promises2: Promise<any>[] = [];

                        jobs.forEach((job: any) => {
                            const p2 = $.ajax(`/api/v4/projects/${projectId}/jobs/${job.id}/trace`).then(data => {
                                const match = data.match(/Go to (https:\/\/[^$]\S*)/m);
                                if (match[1]) {
                                    urls.push(match[1]);
                                }
                            });
                            promises2.push((p2 as any) as Promise<any>);
                        });
                        return Promise.all(promises2);
                    });
                promises.push((p as any) as Promise<any>);
            });
            return Promise.all(promises);
        })
        .then(() => urls);
}
