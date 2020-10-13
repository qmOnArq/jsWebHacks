import { isE2e } from './is-e2e';
import { getHashVariables } from './hash-variables';
import { colorForIndex } from './color-for-index';
import { snakeCase, toUpper } from 'lodash';

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
        Specific jobs docs: https://gitlab.exponea.com/e2e/e2e-tests/-/blob/master/docs/RUNNING-SPECIFIC-JOBS.md
        RUN_ALL
            true

        JOBS
            app
            we
            dp
            cmp
            anl

        SPEC
            e.g. cypress/integration/campaigns/scenarios/scenarios.e2e.ts
            e.g. cypress/integration/campaigns/surveys/surveys.e2e.ts,cypress/integration/analytics/funnels/funnels.e2e.ts

        Private instance docs: https://gitlab.exponea.com/e2e/e2e-tests/-/blob/master/docs/PRIVATE-INSTANCES.md
        TEST_ENV_USERNAME
        TEST_ENV_PASSWORD
        PRIVATE_INSTANCE
        PRIVATE_INSTANCE_API
        PRIVATE_INSTANCE_CDN
     */
    const suiteButtons: SuiteButton[] = [
        { variables: [{ key: 'RUN_ALL', value: 'true' }], label: 'Run all' },
        { variables: [{ key: 'MODULES', value: 'app' }], label: 'App' },
        { variables: [{ key: 'MODULES', value: 'anl' }], label: 'Analytics' },
        { variables: [{ key: 'MODULES', value: 'cmp' }], label: 'Campaigns' },
        { variables: [{ key: 'MODULES', value: 'dp' }], label: 'Data Pipe' },
        { variables: [{ key: 'MODULES', value: 'we' }], label: 'Web Exp' },
        { variables: [{ key: 'MODULES', value: 'screenshot tests' }], label: 'Screenshot tests' },
        { variables: [{ key: 'SPEC', value: '' }], label: 'Specific test run' },
        {
            variables: [
                { key: 'PRIVATE_INSTANCE', value: '' },
                { key: 'PRIVATE_INSTANCE_API', value: '' },
                { key: 'PRIVATE_INSTANCE_CDN', value: '' },
                { key: 'TEST_ENV_USERNAME', value: '' },
                { key: 'TEST_ENV_PASSWORD', value: '' },
            ],
            label: 'Private Instance',
        },
    ];

    $('.js-ci-variable-list-section .ci-variable-list').after(
        '<div style="margin-top: 10px" id="MONAR_E2E_VARIABLES_BUTTONS"></div>',
    );

    suiteButtons.forEach((button, index) => {
        const background = `background: ${colorForIndex(index)};`;

        const buttonHtml = $(`
            <a class="label-link" style="cursor: pointer; margin-bottom: 10px; margin-right: 5px;" id="MONAR_E2E_VARIABLES_BUTTON_${toUpper(
            snakeCase(button.label),
        )}">
                <span class="badge color-label" style="${background}; height: 26px; line-height: 22px; border: 3px solid transparent;">
                    ${button.label}
                </span>
            </a>
        `);

        buttonHtml.on('click', () => {
            button.variables.forEach((variable, index) => {
                let existingInput: JQuery = null!;

                $('*[name="pipeline[variables_attributes][][key]"]').each(function() {
                    const item = $(this);

                    // delete all pipeline variables that's not gonna be used in this preset
                    if (
                        isPipelineVariable(item.val()) &&
                        !button.variables.map(v => v.key).includes(item.val() as any)
                    ) {
                        item.siblings('button').trigger('click');
                    }

                    // reuse existing key input
                    if (item.val() === variable.key) {
                        existingInput = item;
                    }
                });

                if (existingInput) {
                    existingInput.val(variable.key);
                    $('*[name="pipeline[variables_attributes][][secret_value]"]', existingInput.parent()).val(
                        variable.value,
                    );
                } else {
                    insertNewVariable(variable.key, variable.value);
                }
            });
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
        $(`#MONAR_E2E_VARIABLES_BUTTON_${key}_${value} span`).css({ 'border-color': 'black' });
    }
}

const PipelineVariableValues = [
    'RUN_ALL',
    'JOBS',
    'MODULES',
    'SPEC',
    'PRIVATE_INSTANCE',
    'PRIVATE_INSTANCE_API',
    'PRIVATE_INSTANCE_CDN',
    'TEST_ENV_USERNAME',
    'TEST_ENV_PASSWORD',
] as const;

type PipelineVariable = typeof PipelineVariableValues[number];

function isPipelineVariable(x: any): x is PipelineVariable {
    return PipelineVariableValues.includes(x);
}

interface SuiteButton {
    label: string;
    variables: { key: PipelineVariable; value: string }[];
}
