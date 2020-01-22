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
}
