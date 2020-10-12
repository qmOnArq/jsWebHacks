import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../../deferred';
import { GitlabPipelines } from './pipelines-api';
import { GitlabCommits } from './commits-api';

export namespace GitlabJobs {
    export interface JobBase {
        allow_failure: boolean;
        artifacts: {
            file_format: string;
            file_type: string;
            filename: string;
            size: number;
        }[];
        artifacts_expire_at: string;
        artifacts_file: { filename: string; size: number };
        commit: GitlabCommits.Commit;
        coverage: null;
        created_at: string;
        duration: number;
        finished_at: string;
        id: number;
        ref: string;
        stage: string;
        started_at: string;
        status: 'created' | 'pending' | 'running' | 'failed' | 'success' | 'canceled' | 'skipped' | 'manual';
        tag: boolean;
        web_url: string;
        pipeline: GitlabPipelines.PipelineBase;
        name: string;
        runner: {
            active: boolean;
            description: string;
            id: number;
            ip_address: string;
            is_shared: boolean;
            name: string;
            online: boolean;
            status: string;
        };
        user: {
            avatar_url: string;
            bio: string;
            created_at: string;
            id: number;
            linkedin: string;
            location: string;
            name: string;
            organization: string;
            public_email: string;
            skype: string;
            state: string;
            twitter: string;
            username: string;
            web_url: string;
            website_url: string;
        };
    }

    export function getJobsForPipeline(
        pipelineId: number,
        filter: {
            scope?: 'created' | 'pending' | 'running' | 'failed' | 'success' | 'canceled' | 'skipped' | 'manual';
        } = {},
    ) {
        const projectId = getProjectId();
        const result = new Deferred<JobBase[]>();

        $.ajax({ url: `/api/v4/projects/${projectId}/pipelines/${pipelineId}/jobs`, data: filter })
            .then((data: JobBase[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function getJobLog(jobId: number) {
        const projectId = getProjectId();
        const result = new Deferred<string>();

        $.ajax(`/api/v4/projects/${projectId}/jobs/${jobId}/trace`)
            .then((data: string) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
