import { isPullRequestsListPage } from './is-pull-requests-list-page';
import { isFrontend } from './is-frontend';
import { createFeebasCommitButtons, createMainFeebasMergeRequestButton } from './feebas';
import { CommitApprovals } from '../services/commit-approvals';
import { createRunE2eButton } from './e2e-start-pipeline-button';
import { isApp } from './is-app';
import { pullRequestPage } from '../constants/pull-request-page.constant';

export function prettifyPullRequestPage() {
    if (!isPullRequestsListPage()) {
        return;
    }

    // Approvals
    $('.approvals-required-text.text-muted').remove();

    // Remove "You can merge this merge request manually using the  command line"
    $('.mr-section-container.mr-widget-workflow .mr-widget-footer').remove();

    // Remove text in pipeline info
    $('.mr-widget-heading.mr-widget-workflow .ci-widget-content').remove();

    // Redesign pipeline info
    $('.mr-state-widget.prepend-top-default').css('position', 'relative');
    const pipelineWrap = $('.ci-widget.media').closest('.mr-widget-heading.mr-widget-workflow');
    pipelineWrap.css({
        position: 'absolute',
        right: '70px',
        top: '-15px',
        border: 'none',
    });
    $('.ci-widget-container', pipelineWrap).insertBefore($('.align-self-start', pipelineWrap));
    $('.align-self-start', pipelineWrap).css({
        'margin-left': '15px',
        'margin-right': 0,
    });
    pipelineWrap.addClass('remove-before');

    // Cleanup first box
    $('.diverged-commits-count')
        .contents()
        .filter(function() {
            return this.nodeType == 3;
        })
        .remove();
    $('.diverged-commits-count').css('font-size', '10px');

    $('.git-merge-container .normal strong')
        .contents()
        .filter(function() {
            return (
                $(this)
                    .text()
                    .trim() === 'Request to merge'
            );
        })
        .remove();

    // Move "Check out branch"
    $('.js-check-out-branch').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-check-out-branch').removeClass('btn');
    $('.js-check-out-branch').wrap('<li></li>');

    // Move "Open in Web IDE"
    $('.js-web-ide').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-web-ide').removeClass('btn');
    $('.js-web-ide').wrap('<li></li>');
    $('.branch-actions ul.dropdown-menu').css('overflow', 'hidden');

    // Emotes
    $('.emoji-list-container .awards')
        .css('opacity', 0.1)
        .css('border-bottom', 'none');
    $('.emoji-list-container .awards')
        .mouseenter(function() {
            $(this).css('opacity', 1);
        })
        .mouseleave(function() {
            $(this).css('opacity', 0.1);
        });

    // Feebas - main
    if (isFrontend() && window.gl.mrWidgetData) {
        createMainFeebasMergeRequestButton();
        createFeebasCommitButtons();
    }

    // Approve button
    let approveButtonTries = 0;
    function createApproveButton() {
        const $buttonsRow = $('.detail-page-header-actions.js-issuable-actions .issue-btn-group');
        const $button = $('[data-qa-selector="approve_button"]').clone(true, true);

        if ($button.length === 0) {
            approveButtonTries++;
            if (approveButtonTries > 10) {
                return;
            }
            setTimeout(() => {
                createApproveButton();
            }, 100);
            return;
        }

        $buttonsRow.prepend($button);
        $button.css({ float: 'left' });
        $button.removeClass('btn-sm');
        $button.attr('data-qa-selector', '-');
        $button.on('click', function() {
            $('[data-qa-selector="approve_button"]')[0]?.click();
            $(this).off('click');
            $(this).addClass('disabled');
            setTimeout(() => {
                $(this).remove();
                approveButtonTries = 0;
                createApproveButton();
            }, 1000);
        });
    }
    approveButtonTries = 0;
    createApproveButton();
    CommitApprovals.GUI.markApprovedCommits();

    // Run E2E button
    createRunE2eButton(window?.gl?.mrWidgetData?.iid);

    function replaceAIBotAppearance() {
        if (!isFrontend() && !isApp()) {
            return;
        }

        // Only for selected users
        if (!pullRequestPage.AIreviewer.newAppearance.allowedTargetUserIds.includes(window.monar_GLOBALS.id)) {
            return;
        }

        $('.discussion-notes .note.note-wrapper').each((_, note) => {
            const $userNameLinks = $(note).find(
                `.author-name-link[data-username="${pullRequestPage.AIreviewer.userName}"]`,
            );

            if ($userNameLinks.length > 0) {
                $userNameLinks.each((_, link) => {
                    $(link).text(pullRequestPage.AIreviewer.newAppearance.userName);
                });

                const $avatarLink = $(note).find(
                    `.timeline-avatar .gl-avatar-link[data-username="${pullRequestPage.AIreviewer.userName}"]`,
                );
                if ($avatarLink.length > 0) {
                    $avatarLink.css('width', '32px').css('height', '32px');
                    const $avatarIdenticon = $avatarLink.find('.gl-avatar.gl-avatar-identicon');
                    if ($avatarIdenticon.length > 0) {
                        $avatarIdenticon.replaceWith(`<img
                                src="${pullRequestPage.AIreviewer.newAppearance.imageSrc}"
                                class="gl-avatar gl-avatar-circle gl-avatar-s32"
                                style="height: 100%;object-fit: cover;"
                        >`);
                    }
                }
            }
        });
    }

    replaceAIBotAppearance();

    // Remove errors
    setInterval(() => {
        $('.err').removeClass('err');
    }, 500);
}
