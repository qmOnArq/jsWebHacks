import { CONSTS_CSS } from "./CONSTS";

export function createFeebasCommitButtons() {
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
