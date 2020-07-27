import { isE2e } from './is-e2e';
import { getHashVariables } from './hash-variables';
import { colorForIndex } from './color-for-index';

export function enhanceE2eCreatePipelineScreen() {
    if (!isE2e()) {
        return;
    }

    if (!location.pathname.includes('pipelines/new')) {
        return;
    }

    const variables = getHashVariables();

    // Pre-fill FE version
    if (variables.fe_version) {
        insertNewVariable('DOCKER_FRONTEND_VERSION', variables.fe_version);
    }

    // Help for Pipeline variables
    /*
        RUN_ALL
            true

        JOBS
            app
            we
            dp
            cmp
            anl
     */
    const suiteButtons = [
        { key: 'RUN_ALL', value: 'true', label: 'Run all' },
        { key: 'JOBS', value: 'app', label: 'App' },
        { key: 'JOBS', value: 'anl', label: 'Analytics' },
        { key: 'JOBS', value: 'cmp', label: 'Campaigns' },
        { key: 'JOBS', value: 'dp', label: 'Data Pipe' },
        { key: 'JOBS', value: 'we', label: 'Web Exp' },
    ];

    $('.js-ci-variable-list-section .ci-variable-list').after(
        '<div style="margin-top: 10px" id="MONAR_E2E_VARIABLES_BUTTONS"></div>',
    );

    suiteButtons.forEach((button, index) => {
        const background = `background: ${colorForIndex(index)};`;

        const buttonHtml = $(`
            <a class="label-link" style="cursor: pointer; margin-bottom: 10px; margin-right: 5px;" id="MONAR_E2E_VARIABLES_BUTTON_${button.key}_${button.value}">
                <span class="badge color-label" style="${background}; height: 26px; line-height: 22px; border: 3px solid transparent;">
                    ${button.label}
                </span>
            </a>
        `);

        buttonHtml.on('click', () => {
            let existingInput: JQuery = null!;

            $('*[name="pipeline[variables_attributes][][key]"]').each(function() {
                const item = $(this);
                if (item.val() === 'JOBS' || item.val() === 'RUN_ALL') {
                    existingInput = item;
                }
            });

            if (existingInput) {
                existingInput.val(button.key);
                $('*[name="pipeline[variables_attributes][][secret_value]"]', existingInput.parent()).val(button.value);
            } else {
                insertNewVariable(button.key, button.value);
            }

            markSelectedButton();
        });

        $('#MONAR_E2E_VARIABLES_BUTTONS').append(buttonHtml);
    });
    markSelectedButton();
}

function insertNewVariable(key: string, value: string) {
    $('*[name="pipeline[variables_attributes][][key]"]')
        .last()
        .val(key);

    $('*[name="pipeline[variables_attributes][][secret_value]"]')
        .last()
        .val(value);

    // simulate input event to create new input field for next variable
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    $('*[name="pipeline[variables_attributes][][key]"]')
        .last()[0]
        .dispatchEvent(evt);
}

function markSelectedButton() {
    let existingInput: JQuery = null!;

    $('*[name="pipeline[variables_attributes][][key]"]').each(function() {
        const item = $(this);
        if (item.val() === 'JOBS' || item.val() === 'RUN_ALL') {
            existingInput = item;
        }
    });

    $('#MONAR_E2E_VARIABLES_BUTTONS a span').css({ 'border-color': 'transparent' });

    if (existingInput) {
        const key = existingInput.val();
        const value = $('*[name="pipeline[variables_attributes][][secret_value]"]', existingInput.parent()).val();
        $(`#MONAR_E2E_VARIABLES_BUTTON_${key}_${value} span`).css({ 'border-color': 'black'});
    }
}
