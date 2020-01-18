import { getProjectId } from '../../functions/get-project-id';
import { Deferred } from '../../classes/deferred';

export namespace GitlabDiscussions {
    export interface Discussion {
        id: string;
        individual_note: boolean;
        notes: Note[];
    }

    export interface Note {
        id: number;
        type: string;
        body: string;
        attachment: null;
        author: Author;
        created_at: string;
        updated_at: string;
        system: boolean;
        noteable_id: number;
        noteable_type: string;
        noteable_iid: number;
        resolved: boolean;
        resolvable: boolean;
        resolved_by: null | Author;
        position?: Position;
    }

    export interface Author {
        id: number;
        name: string;
        username: string;
        state: string;
        avatar_url: string;
        web_url: string;
    }

    export interface Position {
        base_sha: string;
        start_sha: string;
        head_sha: string;
        old_path: string;
        new_path: string;
        position_type: string;
        old_line: number;
        new_line: number;
    }

    export function getMergeRequestDiscussions(mergeRequestId: number) {
        const projectId = getProjectId();
        const result = new Deferred<Discussion[]>();

        $.ajax(`/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/discussions`)
            .then((data: Discussion[]) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function createMergeRequestThread(mergeRequestId: number, text: string) {
        const projectId = getProjectId();
        const result = new Deferred<Discussion>();

        $.ajax({
            url: `/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/discussions`,
            method: 'POST',
            data: {
                body: text,
            },
        })
            .then((data: any) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function modifyMergeRequestNote(mergeRequestId: number, discussionId: string, noteId: number, text: string) {
        const projectId = getProjectId();
        const result = new Deferred<Note>();

        $.ajax({
            url: `/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/discussions/${discussionId}/notes/${noteId}`,
            method: 'PUT',
            data: {
                body: text,
            },
        })
            .then((data: any) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }

    export function resolveMergeRequestThread(mergeRequestId: number, threadId: string, newStatus: boolean) {
        const projectId = getProjectId();
        const result = new Deferred<Discussion>();

        $.ajax({
            url: `/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/discussions/${threadId}`,
            method: 'PUT',
            data: {
                resolved: newStatus,
            },
        })
            .then((data: any) => {
                result.resolve(data);
            })
            .catch(result.reject);

        return result.promise;
    }
}
