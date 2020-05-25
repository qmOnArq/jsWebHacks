import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../classes/deferred';
import { GitlabDiscussions } from './discussions-api';

export namespace GitlabPipelines {
    export interface PipelineScheduleBase {
        id: number;
        description: string;
        ref: string;
        cron: string;
        cron_timezone: string;
        next_run_at: string;
        active: boolean;
        created_at: string;
        updated_at: string;
        owner: GitlabDiscussions.Author;
    }

    export interface PipelineSchedule extends PipelineScheduleBase {
        last_pipeline: {
            id: number;
            sha: string;
            ref: string;
            status: string;
        };
        variables: { key: string; variable_type: string; value: string }[];
    }

    export interface PipelineBase {
        created_at: string;
        id: number;
        ref: string;
        sha: string;
        status: string;
        updated_at: string;
        web_url: string;
    }

    export function getPipelineSchedules() {
        const projectId = getProjectId();
        const result = new Deferred<PipelineScheduleBase[]>();

        $.ajax(`/api/v4/projects/${projectId}/pipeline_schedules`)
            .then((data: PipelineScheduleBase[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function getPipelineSchedule(id: number) {
        const projectId = getProjectId();
        const result = new Deferred<PipelineSchedule>();

        $.ajax(`/api/v4/projects/${projectId}/pipeline_schedules/${id}`)
            .then((data: PipelineSchedule) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function getPipelines(
        filter: {
            scope?: 'running' | 'pending' | 'finished' | 'branches' | 'tags';
            status?: 'running' | 'pending' | 'success' | 'failed' | 'canceled' | 'skipped' | 'created' | 'manual';
            ref?: string;
            sha?: string;
            yaml_errors?: boolean;
            name?: string;
            username?: string;
            updated_after?: string;
            updated_before?: string;
            order_by?: 'id' | 'status' | 'ref' | 'updated_at' | 'user_id';
            sort?: 'asc' | 'desc';
        } = {},
    ) {
        const projectId = getProjectId();
        const result = new Deferred<PipelineBase[]>();

        $.ajax({
            url: `/api/v4/projects/${projectId}/pipelines`,
            data: filter,
        })
            .then((data: PipelineSchedule) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
