import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../classes/deferred';
import { GitlabCommits } from './commits-api';

export namespace GitlabTags {
    export interface TagBase {
        message: string;
        name: string;
        protected: boolean;
        release: {
            tag_name: string;
            description: string;
        } | null;
        target: string;
        commit: GitlabCommits.Commit;
    }

    export function getTags(search = '') {
        const projectId = getProjectId();
        const result = new Deferred<TagBase[]>();

        $.ajax(`/api/v4/projects/${projectId}/repository/tags?search=${search}`)
            .then((data: TagBase[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
