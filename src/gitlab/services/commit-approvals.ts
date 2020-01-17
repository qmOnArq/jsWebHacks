import { Deferred } from '../classes/deferred';
import { CommentParser } from './comment-parser';

export namespace CommitApprovals {
    export interface Approvals {
        [commitId: string]: Approval[];
    }

    export interface Approval {
        username: string;
        name: string;
        avatar: string;
    }

    export function toggleCommitApproval(mergeRequestId: number, commitId: string) {
        if (!window.monar_MR_DATA) {
            return Promise.reject('toggleCommitApproval: no monar_MR_DATA');
        }

        window.monar_MR_DATA.approvals = window.monar_MR_DATA.approvals ?? {};
        window.monar_MR_DATA.approvals[commitId] = window.monar_MR_DATA.approvals[commitId] ?? [];
        const isApprovedByYou = window.monar_MR_DATA.approvals[commitId].some(
            approval => approval.username === window.monar_GLOBALS.username,
        );
        if (isApprovedByYou) {
            window.monar_MR_DATA.approvals[commitId] = window.monar_MR_DATA.approvals[commitId].filter(
                approval => approval.username !== window.monar_GLOBALS.username,
            );
        } else {
            window.monar_MR_DATA.approvals[commitId].push({
                username: window.monar_GLOBALS.username,
                name: window.monar_GLOBALS.name,
                avatar: window.monar_GLOBALS.avatar,
            });
        }

        const result = new Deferred();
        CommentParser.saveMergeRequestCommentData(window?.gl?.mrWidgetData?.iid)
            .then(() => {
                result.resolve();
            })
            .catch(result.reject);
        return result.promise;
    }
}
