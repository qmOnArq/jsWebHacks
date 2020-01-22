import { getProjectId } from './get-project-id';
import { CONSTS_CSS, CONSTS_STRINGS, REPLACE } from './CONSTS';
import { saveSettings } from './save-load-settings';
import { hidePrStuff } from './hide-pr-stuff';
import { GitlabDiscussions } from '../services/gitlab-api/discussions-api';

export function formatPullRequest(request: any) {
    const projectId = getProjectId();

    // Remove "x of y" approvals required
    $('li[data-original-title="Approvals"], li[title="Approvals"]', request.element).remove();

    // Buttons
    if ($('#monar-pull-requests-buttons').length === 0) {
        $('.top-area').css('position', 'relative');
        $('.top-area').append(
            '<div id="monar-pull-requests-buttons" style="display: inline-block; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"></div>',
        );
        $('#monar-pull-requests-buttons').append(
            '<a id="monar-pull-requests-buttons-hide-wip" href="javascript:void(0)" class="btn btn-sm btn-missing">Hide WIP</a>',
        );
        $('#monar-pull-requests-buttons-hide-wip').on('click', function() {
            window.monar_SETTINGS.hideWip = !window.monar_SETTINGS.hideWip;
            $('#monar-pull-requests-buttons-hide-wip').toggleClass('btn-missing', !window.monar_SETTINGS.hideWip);
            $('#monar-pull-requests-buttons-hide-wip').toggleClass('btn-info', window.monar_SETTINGS.hideWip);
            $('#monar-pull-requests-buttons-hide-wip').blur();
            saveSettings();
            hidePrStuff();
        });
        $('#monar-pull-requests-buttons-hide-wip').toggleClass('btn-missing', !window.monar_SETTINGS.hideWip);
        $('#monar-pull-requests-buttons-hide-wip').toggleClass('btn-info', window.monar_SETTINGS.hideWip);

        hidePrStuff();

        const urlMine = `${window.monar_GLOBALS.project}/merge_requests?scope=all&utf8=%E2%9C%93&state=opened&author_username=${window.monar_GLOBALS.username}`;
        $('#monar-pull-requests-buttons').append(
            `<a style="margin-left: 10px" id="monar-pull-requests-buttons-show-mine" href="${urlMine}" class="btn btn-sm btn-success">Show mine</a>`,
        );
        const urlAssignedToMe = `${window.monar_GLOBALS.project}/merge_requests?scope=all&utf8=✓&state=opened&assignee_username=${window.monar_GLOBALS.username}`;
        $('#monar-pull-requests-buttons').append(
            `<a style="margin-left: 10px" id="monar-pull-requests-buttons-show-my-rev" href="${urlAssignedToMe}" class="btn btn-sm btn-warning">Assigned to me</a>`,
        );
        const urlWithoutAssignee = `${window.monar_GLOBALS.project}/merge_requests?scope=all&utf8=✓&state=opened&assignee_id=None&wip=no`;
        $('#monar-pull-requests-buttons').append(
            `<a style="margin-left: 10px" id="monar-pull-requests-buttons-show-without-rev" href="${urlWithoutAssignee}" class="btn btn-sm btn-danger">Without assignee</a>`,
        );
    }

    // Target
    if (request.target === 'prod') {
        request.targetElement.css(CONSTS_CSS('prod'));
    } else if (request.target === 'qa') {
        request.targetElement.css(CONSTS_CSS('qa'));
    } else if (request.target === 'cloud') {
        request.targetElement.css(CONSTS_CSS('cloud'));
    }

    // Author photo
    let authorPhoto = $('.monar-author-photo', request.element);
    if (!authorPhoto[0]) {
        $('.issuable-info-container', request.element).prepend(CONSTS_STRINGS('authorPhotoHTML'));
        authorPhoto = $('.monar-author-photo', request.element);
    }
    authorPhoto.css(CONSTS_CSS('authorPhoto'));
    authorPhoto.css('background-image', `url(${window.monar_GLOBALS.defaultAvatar})`);
    $('div', authorPhoto).css(
        'background-image',
        `url('/uploads/-/system/user/avatar/${request.author.id}/avatar.png?width=44')`,
    );

    // Title modifications
    request.titleElement.css(CONSTS_CSS('titleBase'));
    let title = request.title;
    title = title.replace(/^Resolve/g, '');
    title = title.replace(/(APP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(APPT-\d*)/g, '<b>$1</b>');
    title = title.replace(/(CMP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(DB-\d*)/g, '<b>$1</b>');
    title = title.replace(/(FIX)/g, '<b>$1</b>');
    title = title.replace(/(QA-\d*)/g, '<b>$1</b>');
    title = title.replace(/(SEC-\d*)/g, '<b>$1</b>');
    title = title.replace(/(DP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(PRED-\d*)/g, '<b>$1</b>');
    title = title.replace(/(FRON-\d*)/g, '<b>$1</b>');
    title = title.replace(/(STYL-\d*)/g, '<b>$1</b>');
    title = title.replace(/(WE-\d*)/g, '<b>$1</b>');
    title = title.replace(/(ANL-\d*)/g, '<b>$1</b>');
    title = title.replace(/\[([^\]]+)\]/gi, '<b style="background-color: rgba(0,255,255,0.5); color: black;">[$1]</b>');
    title = title.replace(/WIP(:?)/g, '<b style="color: red;">WIP$1</b>');
    request.titleElement.html(title);
    request.titleElement.css({
        display: 'inline-block',
        'max-width': '440px',
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        'white-space': 'nowrap',
    });

    // Upvoted
    if (request.isUpvoted) {
        request.upvoteElement.css(CONSTS_CSS('upvoteIcon'));
    }
    if (request.downvoteElement[0]) {
        request.downvoteElement.css(CONSTS_CSS('downvoteIcon'));
    }

    // Conflict
    if (request.hasConflict) {
        request.conflictElement.css(CONSTS_CSS('conflictIcon'));
    }

    // System
    if (request.isSystem) {
        request.element.css(CONSTS_CSS('systemBg'));
    }

    // Approved
    if (request.isApproved) {
        request.element.css(CONSTS_CSS('approvedBg'));
    }

    // Reviewer
    if (request.reviewerElement[0]) {
        $('img', request.reviewerElement).css(CONSTS_CSS('reviewerPhoto'));
        request.reviewerElement.css(CONSTS_CSS('reviewerWrapper'));

        request.reviewerElement.each(function(this: any, index: any) {
            $(this).css('right', parseInt($(this).css('right')) + 30 * index + 'px');
        });
    }

    // Pipeline
    if (request.pipelineElement[0]) {
        request.pipelineElement.css(CONSTS_CSS('pipelineWrapper'));
    }

    // Comments
    if (request.commentsCount < 1) {
        request.commentsElement.remove();
    } else {
        request.commentsElement.css(CONSTS_CSS('commentsWrapper'));
    }

    // Updated at
    if (request.updatedAtElement[0]) {
        request.updatedAtElement.css(CONSTS_CSS('updatedAtWrapper'));
    }

    // Status (merged / closed)
    if (request.statusElement[0]) {
        request.statusElement.css('color', request.status === 'MERGED' ? 'green' : 'red');
        request.statusElement.css(CONSTS_CSS('statusWrapper'));
    }

    // Bottom text
    if (request.bottomTextElement[0]) {
        request.bottomTextElement.html(request.bottomTextElement.html().replace('opened', ''));
        request.bottomTextElement.html(request.bottomTextElement.html().replace('by', '·'));
    }

    // Time
    if ($('time', request.element)[0]) {
        $('time', request.element).each(function(this: any) {
            $(this).html(
                $(this)
                    .html()
                    .replace('just now', 'now')
                    .replace(' minutes', 'm')
                    .replace(' minute', 'm')
                    .replace(' hours', 'h')
                    .replace(' hour', 'h')
                    .replace(' days', 'd')
                    .replace(' day', 'd')
                    .replace(' weeks', 'w')
                    .replace(' week', 'w')
                    .replace(' months', 'mon')
                    .replace(' month', 'mon'),
            );
        });
    }

    // Line

    if (projectId !== null) {
        // Unresolved discussions
        let unresolved = 0;
        GitlabDiscussions.getMergeRequestDiscussions(request.id)
            .then(function(data) {
                (data || []).forEach(item => {
                    if (item.notes && item.notes[0]) {
                        const note = item.notes[0];
                        if (note.resolvable && !note.resolved) {
                            unresolved++;
                        }
                    }
                });

                if (unresolved > 0) {
                    $('a', request.commentsElement).prepend(
                        `<span style="color: red;"><i aria-hidden="true" data-hidden="true" class="fa fa-crosshairs"></i><span>${unresolved}</span></span>&nbsp;&nbsp;&nbsp;`,
                    );
                }
            })
            .catch((x: any) => {
                console.log(x.responseJSON);
            });

        // Changes
        $.ajax(`${window.monar_GLOBALS.project}/merge_requests/${request.id}/diffs.json?w=0`)
            .then((data: any) => {
                const size = data.size;
                const added = data.added_lines;
                const removed = data.removed_lines;

                const html = `
                    <div style="display: inline-block; position: absolute; left: 525px;">
                    ${CONSTS_STRINGS('changed').replace(REPLACE, size)}
                    ${CONSTS_STRINGS('added').replace(REPLACE, added)}
                    ${CONSTS_STRINGS('removed').replace(REPLACE, removed)}
                    </div>
                `;

                $('.merge-request-title.title', request.element).append(html);
            })
            .catch((x: any) => {
                console.log(x);
            });

        // Approvals
        $.ajax(`/api/v4/projects/${projectId}/merge_requests/${request.id}/approvals`)
            .then((data: any) => {
                (data.approved_by || []).forEach((item: any, index: number) => {
                    item = item.user;
                    // Author photo
                    const className = `monar-approve-photo-${item.id}`;

                    const html = `<div class="${className}"><div style="width: 100%; height: 100%; background-size: contain;"></div></div>`;
                    const css = {
                        display: 'block',
                        width: '24px',
                        height: '24px',
                        'background-color': 'gray',
                        'background-size': 'contain',
                        'border-radius': '50%',
                        overflow: 'hidden',
                        border: '2px solid #69D100',
                        position: 'absolute',
                        top: '34px',
                        right: index * 30 + 215 + 'px',
                    };

                    let approvePhoto = $('.' + className, request.element);
                    if (!approvePhoto[0]) {
                        $('.issuable-info-container', request.element).prepend(html);
                        approvePhoto = $('.' + className, request.element);
                    }
                    approvePhoto.css(css);
                    approvePhoto.css('background-image', `url(${window.monar_GLOBALS.defaultAvatar})`);
                    $('div', approvePhoto).css('background-image', `url('${item.avatar_url}?width=44')`);
                    $('div', approvePhoto).attr('title', item.name);
                });

                if (data.approved_by.length >= (data.approvals_required || 1)) {
                    request.element.css(CONSTS_CSS('approvedBg'));
                }
            })
            .catch((x: any) => {
                console.log(x.responseJSON);
            });
    }
}
