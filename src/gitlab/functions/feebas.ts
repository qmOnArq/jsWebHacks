import { CONSTS_CSS } from "./CONSTS";

// disable feebas for now
const feebasEnabled = false;

export function createFeebasCommitButtons() {
    if (!feebasEnabled) {
        return;
    }

    const feebasInterval = setInterval(() => {
        if ($('#commits-list').length !== 0) {
            clearInterval(feebasInterval);

            $('#commits-list li .commit-actions').each(function() {
                const element = $(this);
                const commitId = $('[data-title="Copy commit SHA to clipboard"]', element).data('clipboard-text');
                const id = `monar-feebas-${commitId}`;
                const href = `feebas://app:${commitId}`;
                element.append(`<a title="Open in Feebas" id="${id}" href="${href}"></a>`);
                $('#' + id).css(CONSTS_CSS('feebas'));
                $('#' + id).css('margin-left', '15px');

                $('#' + id)
                    .mouseenter(function() {
                        $(this).css('background-color', '#1aaa55');
                    })
                    .mouseleave(function() {
                        $(this).css('background-color', 'transparent');
                    });
            });
        }
    }, 500);
}

export function createMainFeebasMergeRequestButton() {
    if (!feebasEnabled) {
        return;
    }

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
}
