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
        { variables: [{ key: 'JOBS', value: 'screenshot tests' }], label: 'Screenshot tests' },
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
            if (!button.selected) {
                button.selected = true;
                addButtonVariables(button.variables);
                markButton(button, button.selected);
            } else {
                button.selected = false;
                removeButtonVariables(button.variables);
                markButton(button, button.selected);
            }
        });

        $('#MONAR_E2E_VARIABLES_BUTTONS').append(buttonHtml);
    });
}

function addButtonVariables(variables: { key: PipelineVariable; value: string }[]) {
    variables.forEach((variable) => {
        let existingVariableNameInput: JQuery = getExistingInput('key', variable.key);

        if (existingVariableNameInput) {
            const existingVariableValueInput = $(getGitlabVariableInputString('secret_value'), existingVariableNameInput.parent());

            // Differentiate between variables which can contain multiple values separated by ":"
            if (isMultiple(variable.key)) {
                const values = String(existingVariableValueInput.val()).split(':');
                if (!values.includes(variable.value)) {
                    values.push(variable.value);
                    existingVariableValueInput.val(values.join(':'));
                }
            } else {
                existingVariableValueInput.val(variable.value);
            }
        } else {
            insertNewVariable(variable.key, variable.value);
        }
    });
}

function removeButtonVariables(variables: { key: PipelineVariable; value: string }[]) {
    return;
}

function insertNewVariable(key: string, value: string) {
    $(getGitlabVariableInputString('key'))
        .last()
        .val(key);

    $(getGitlabVariableInputString('secret_value'))
        .last()
        .val(value);

    // simulate input event to create new input field for next variable
    const evt = document.createEvent('HTMLEvents');
    evt.initEvent('input', true, true);
    $(getGitlabVariableInputString('key'))
        .last()[0]
        .dispatchEvent(evt);
}

function markButton(button: SuiteButton, selected: boolean) {
    const targetElement = $(`#MONAR_E2E_VARIABLES_BUTTON_${toUpper(snakeCase(button.label))} span`);
    targetElement.css({ 'border-color': selected ? 'black' : 'transparent' });
}

function getExistingInput(type: 'key' | 'secret_value', searchMatch: string) {
    let matchedInput: JQuery = null!;

    $(getGitlabVariableInputString(type)).each(function() {
        if ($(this).val() === searchMatch) {
            matchedInput = $(this);
            return false;
        }
        return;
    });

    return matchedInput ?? null;
}

function getGitlabVariableInputString(type: 'key' | 'secret_value') {
    return `*[name="pipeline[variables_attributes][][${type}]"]`;
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

const PipelineMultipleVariables = [
    'JOBS', 'MODULES',
];

type PipelineMultipleVariable = typeof PipelineMultipleVariables[number];

function isMultiple(x: any): x is PipelineMultipleVariable {
    return PipelineMultipleVariables.includes(x);
}

interface SuiteButton {
    label: string;
    variables: { key: PipelineVariable; value: string }[];
    selected?: boolean;
}
