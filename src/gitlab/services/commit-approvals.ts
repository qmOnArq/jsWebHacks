import { Deferred } from '../../deferred';
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

    export function toggleCommitApproval(mergeRequestId: number, commitId: string, newValue: boolean) {
        return CommentParser.fetchMergeRequestCommentData(mergeRequestId).then(() => {
            if (!window.monar_MR_DATA) {
                return Promise.reject('toggleCommitApproval: no monar_MR_DATA');
            }

            window.monar_MR_DATA.approvals = window.monar_MR_DATA.approvals ?? {};
            window.monar_MR_DATA.approvals[commitId] = window.monar_MR_DATA.approvals[commitId] ?? [];
            if (!newValue) {
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
        });
    }

    export function isApprovedByYou(commitId: string) {
        if (!window.monar_MR_DATA) {
            return false;
        }

        window.monar_MR_DATA.approvals = window.monar_MR_DATA.approvals ?? {};
        window.monar_MR_DATA.approvals[commitId] = window.monar_MR_DATA.approvals[commitId] ?? [];
        return window.monar_MR_DATA.approvals[commitId].some(
            approval => approval.username === window.monar_GLOBALS.username,
        );
    }

    export namespace GUI {
        export function markApprovedCommits() {
            if (!window?.gl?.mrWidgetData?.iid) {
                return;
            }

            const markInterval = setInterval(attemptToMark, 1000);
            attemptToMark();

            function attemptToMark() {
                if ($('#commits li.commit').length === 0) {
                    return;
                }
                if (!window.monar_MR_DATA) {
                    return;
                }

                clearInterval(markInterval);

                const approvals = window.monar_MR_DATA.approvals || {};

                $('#commits li.commit').each(function() {
                    const id = $('.commit-sha-group button', this).attr('data-clipboard-text') || '';
                    const commitApprovals = approvals[id] || [];
                    commitApprovals.forEach((approval, index) => {
                        const className = `monar-approve-commit-photo-${id}-${index}`;

                        const html = `<div class="${className}"><div style="width: 100%; height: 100%; background-size: contain;"></div></div>`;
                        const css = {
                            display: 'block',
                            width: '32px',
                            height: '32px',
                            'background-color': 'gray',
                            'background-size': 'contain',
                            'border-radius': '50%',
                            overflow: 'hidden',
                            border: '2px solid #69D100',
                            position: 'absolute',
                            top: '6px',
                            right: index * 36 + 215 + 'px',
                        };

                        let approvePhoto = $('.' + className, $(this));
                        if (!approvePhoto[0]) {
                            $('.commit-actions', $(this)).css('position', 'relative');
                            $('.commit-actions', $(this)).prepend(html);
                            approvePhoto = $('.' + className, $(this));
                        }
                        approvePhoto.css(css);
                        approvePhoto.css('background-image', `url(${window.monar_GLOBALS.defaultAvatar})`);
                        $('div', approvePhoto).css('background-image', `url('${approval.avatar}?width=44')`);
                        $('div', approvePhoto).attr('title', approval.name);
                    });
                });
            }
        }
    }
}
