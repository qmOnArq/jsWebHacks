import { isFrontend } from './is-frontend';

export function prettifyCreatePullRequestPage() {
    // Title
    const titleElement: HTMLInputElement | null = document.querySelector('#merge_request_title');
    if (titleElement) {
        const titleRegex = /Resolve (.*?) \"(.*?)\"/g;
        const titleRegexMatch = titleRegex.exec(titleElement.value);
        if (titleRegexMatch && titleRegexMatch.length === 3) {
            titleElement.value = `${titleRegexMatch[1]} ${titleRegexMatch[2]}`;
        }
    } else {
        return;
    }

    // Labels
    $('.labels-select-wrapper button')[0]?.click();
    setTimeout(() => {
        $('.labels-select-wrapper button')[0]?.click();
    }, 50);

    if ($('#MONAR_CUSTOM_LABEL_BUTTONS').length === 0) {
        $('.labels-select-wrapper').closest('.gl-col-12').append(`
            <div id="MONAR_CUSTOM_LABEL_BUTTONS"
                style="
                    display: inline-block;
                    margin-left: 25px;
                    margin-top: 25px;
                    max-width: 500px;
                    vertical-align: top;
                    "
            ></div>
        `);
        createLabelButtons();
    }

    if (titleElement) {
        titleElement.focus();
    }
}

function markSelectedLabels() {
    setTimeout(() => {
        const selectedLabelIds: string[] = [];
        $('.js-labels-list .gl-dropdown-item').each(function() {
            const checkmark = $(this).find('.gl-dropdown-item-check-icon');
            if (!checkmark.hasClass('gl-invisible')) {
                const text = $(this).find('.gl-dropdown-item-text-primary').text().trim();
                if (text === 'No matching results') {
                    return;
                }
                selectedLabelIds.push(text);
            }
        })

        $('[data-monar="CUSTOM_LABEL_BUTTON"]').each(function() {
            const id = $(this).attr('data-id') || '-';
            if (selectedLabelIds.includes(id)) {
                $(this).css('opacity', 1);
                $('span', this).css('border-color', 'rgba(0,0,0,0.8)');
            } else {
                $(this).css('opacity', 0.5);
                $('span', this).css('border-color', 'transparent');
            }
        });

        // Automatic No. approvals required
        if (isFrontend()) {
            const requiresDev = selectedLabelIds.includes(devReviewId);
            const requiresStyler = selectedLabelIds.includes(designReviewId) || selectedLabelIds.includes(styleReviewId);
            const neededAmount = Math.max(1, (requiresDev ? 1 : 0) + (requiresStyler ? 1 : 0));
            $('.js-approvals-required input').val(neededAmount);
            $('input[name="merge_request[approval_rules_attributes][][approvals_required]"]').val(neededAmount);
        }

        $('*[data-testid="embedded-labels-list"]').hide();
    }, 50);
}

let devReviewId = 'dev review';
let designReviewId = 'design review';
let styleReviewId = 'style review';

function createLabelButtons() {
    let tries = 0;

    setTimeout(() => {
        if ($('.js-labels-list .gl-dropdown-item-text-primary').length === 0) {
            tries++;
            if (tries < 20) {
                createLabelButtons();
            }
            return;
        }

        $(`.js-labels-list .gl-dropdown-item-text-primary`).on('click', function() {
            setTimeout(() => {
                markSelectedLabels();
            });
        });

        $(`.js-labels-list .dropdown-clear-active`).on('click', function() {
            setTimeout(() => {
                markSelectedLabels();
            });
        });

        $('.js-labels-list .gl-dropdown-item-text-primary').each(function() {
            const name = $(this)
                .text()
                .trim();
            const color = $('span', this).attr('style');

            if (name === 'No matching results') {
                return;
            }

            const html = `
                <a class="label-link" data-id="${name}" data-monar="CUSTOM_LABEL_BUTTON" style="cursor: pointer; margin-bottom: 10px; margin-right: 5px;">
                    <span class="badge color-label" style="${color}; height: 26px; border: 3px solid transparent; margin-bottom: 5px; line-height: 13px;">
                        ${name}
                    </span>
                </a>
            `;

            $('#MONAR_CUSTOM_LABEL_BUTTONS').append(html);
            $(`[data-id="${name}"][data-monar="CUSTOM_LABEL_BUTTON"]`).on('click', function()  {
                const text1 = $(this).text().trim();
                $(`.js-labels-list .gl-dropdown-item-text-primary`).each(function() {
                    const text2 = $(this).text().trim();
                    if (text1 === text2) {
                        $(this).closest('button')[0].click();

                        $('.labels-select-wrapper button')[0]?.click();
                        setTimeout(() => {
                            $('.labels-select-wrapper button')[0]?.click();
                        }, 50);
                    }
                });
                markSelectedLabels();
            });
        });

        markSelectedLabels();
    }, 50);
}
