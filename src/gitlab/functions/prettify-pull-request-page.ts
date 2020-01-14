import { isPullRequestsListPage } from './is-pull-requests-list-page';
import { isFrontend } from './is-frontend';
import { CONSTS_CSS } from './CONSTS';
import { createFeebasCommitButtons } from './feebas';

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
        if ($('#monar-feebas-main').length === 0) {
            const href = `feebas://app:${window.gl.mrWidgetData.diff_head_sha}`;
            $('.mr-state-widget.prepend-top-default').append(
                `<a title="Open in Feebas" id="monar-feebas-main" href="${href}"></a>`,
            );
            $('#monar-feebas-main').css(CONSTS_CSS('feebas'));
            $('#monar-feebas-main').css({ position: 'absolute', right: '0px', top: '-45px' });
            $('#monar-feebas-main')
                .mouseenter(function() {
                    $(this).css('background-color', '#1aaa55');
                })
                .mouseleave(function() {
                    $(this).css('background-color', 'transparent');
                });
        }

        // Feebas - commits
        createFeebasCommitButtons();
    }

    // Approve button
    function createApproveButton() {
        const $buttonsRow = $('.detail-page-header-actions.js-issuable-actions .issue-btn-group');
        const $button = $('[data-qa-selector="approve_button"]').clone(true, true);
        $buttonsRow.prepend($button);
        $button.css({ float: 'left' });
        $button.removeClass('btn-sm');
        $button.attr('data-qa-selector', '-');
        $button.on('click', function() {
            $('[data-qa-selector="approve_button"]').trigger('click');
            $(this).off('click');
            $(this).addClass('disabled');
            setTimeout(() => {
                $(this).remove();
                createApproveButton();
            }, 1000);
        });
    }
    createApproveButton();

    // Remove errors
    setInterval(() => {
        $('.err').removeClass('err');
    }, 500);
}
