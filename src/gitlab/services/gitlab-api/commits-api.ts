import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../../deferred';

export namespace GitlabCommits {
    export interface Commit {
        author_email: string;
        author_name: string;
        authored_date: string;
        committed_date: string;
        committer_email: string;
        committer_name: string;
        created_at: string;
        id: string;
        message: string;
        parent_ids: string[];
        short_id: string;
        title: string;
    }

    export function getCommits(ref_name = '', per_page = 50) {
        const projectId = getProjectId();
        const result = new Deferred<Commit[]>();

        $.ajax(`/api/v4/projects/${projectId}/repository/commits?ref_name=${ref_name}&per_page=${per_page}`)
            .then((data: Commit[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
