import { isFrontend } from './is-frontend';
import { GitlabPipelines } from '../services/gitlab-api/pipelines-api';
import { GitlabJobs } from '../services/gitlab-api/jobs-api';
import { createHashString } from './hash-variables';

export function createRunE2eButton(mergeRequestId: number) {
    if (!isFrontend()) {
        return Promise.resolve();
    }

    if (mergeRequestId == null) {
        return Promise.resolve();
    }

    return GitlabPipelines.getPipelinesForMR(mergeRequestId).then(pipelines => {
        if (!pipelines || pipelines.length === 0) {
        } else {
            const pipeline = pipelines[0];
            GitlabJobs.getJobsForPipeline(pipeline.id).then(jobs => {
                if (jobs) {
                    const job = jobs.filter(job => job.name === 'exponea docker image')[0];

                    if (job) {
                        if (job.status === 'success') {
                            GitlabJobs.getJobLog(job.id).then(log => {
                                const match = log.match(/latest: digest: (sha256:[^ ]*)/m);
                                if (match && match[1]) {
                                    const url = `/e2e/e2e-tests/pipelines/new/${createHashString({
                                        fe_version: match[1],
                                    })}`;
                                    return createButton('success', url);
                                }
                                return createButton('other');
                            });
                        } else if (job.status === 'pending' || job.status === 'running' || job.status === 'created') {
                            return createButton('running');
                        } else if (job.status === 'failed') {
                            return createButton('error');
                        } else {
                            return createButton('other');
                        }
                    } else {
                        return createButton('noJob');
                    }
                } else {
                    return createButton('noJob');
                }
            });
        }
    });
}

function createButton(status: 'success' | 'noJob' | 'error' | 'running' | 'other', url?: string) {
    let text = '';
    let className = '';

    if (status === 'success') {
        text = 'Run E2E';
        className = 'btn-success';
    } else if (status === 'noJob') {
        text = 'No Docker Job Found';
    } else if (status === 'error') {
        text = 'Docker Job Error';
        className = 'btn-danger';
    } else if (status === 'running') {
        text = 'Docker Job Running';
        className = 'btn-info';
    } else if (status === 'other') {
        text = 'Unknown Docker Job Issue';
    }

    const html = `
        <a
            href="${url || '#'}"
            target="_blank"
            class="btn btn-sm ${url ? '' : 'disabled'} ${className}"
            style="margin-right: 20px"
        >
            ${text}
        </a>
    `;

    $('.mr-state-widget .mr-widget-heading.mr-widget-workflow .ci-widget.media').prepend(html);
}
