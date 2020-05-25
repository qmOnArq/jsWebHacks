import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../classes/deferred';
import { GitlabCommits } from './commits-api';

export namespace GitlabBranches {
    import Commit = GitlabCommits.Commit;

    export interface Branch {
        can_push: boolean;
        commit: Commit;
        default: boolean;
        developers_can_merge: boolean;
        developers_can_push: boolean;
        merged: boolean;
        name: string;
        protected: boolean;
    }

    export function getBranches(search = '') {
        const projectId = getProjectId();
        const result = new Deferred<Branch[]>();

        $.ajax(`/api/v4/projects/${projectId}/repository/branches?search=${search}`)
            .then((data: Branch[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
