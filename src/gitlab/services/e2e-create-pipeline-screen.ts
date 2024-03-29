import { getHashVariables } from '../functions/hash-variables';
import { colorForIndex } from '../functions/color-for-index';
import { snakeCase, toUpper } from 'lodash';
import {
    getMultiValueVariableSeparator,
    isMultiValueVariable,
    PipelineButton,
    pipelineButtons,
    PipelineButtonVariable,
} from '../constants/e2e-pipeline-buttons.constant';
import CreatePipelineScreen from '../services/create-pipeline-screen';
import { KeyValuePair } from '../../types/name-value-pair.type';

export class E2ECreatePipelineScreen extends CreatePipelineScreen {
    constructor() {
        super();

        // Pre-fill default variables from url hash
        this.fillHashVariables();

        // Create E2E Buttons
        this.createButtons();

        // check for removed variable and deactivate buttons
        window.monar_GLOBALS.eventEmitter.addEventListener('variableRemoved', (event: Event) => {
            const variableKey = (event as CustomEvent).detail.variableKey;

            // deactivate buttons containing given variable
            const selectedButtonsContainingVariable = pipelineButtons.filter(
                button => button.variables.some(variable => variable.key === variableKey) && button.selected,
            );

            selectedButtonsContainingVariable.forEach(button => {
                button.selected = false;
                this.markButton(button, button.selected);
            });
        });
    }

    getEnvironmentFromHash(hashVariables: KeyValuePair): string {
        const environmentComponents: string[] = [];

        if (hashVariables.fe_version) {
            environmentComponents.push(`frontend_version: ${hashVariables.fe_version}`);
        }
        if (hashVariables.be_version) {
            environmentComponents.push(`backend_version: ${hashVariables.be_version}`);
        }

        return environmentComponents.join('\\n');
    }

    getTriggerVariablesFromHash(hashVariables: KeyValuePair) {
        const triggerVariables: KeyValuePair = {};

        // Project id and pipeline url of triggering project
        if (hashVariables.source_project_id) {
            triggerVariables['SOURCE_PROJECT_ID'] = hashVariables.source_project_id;
        }
        if (hashVariables.source_pipeline_url) {
            triggerVariables['SOURCE_PIPELINE_URL'] = hashVariables.source_pipeline_url;
        }

        return triggerVariables;
    }

    fillHashVariables() {
        const hashVariables = getHashVariables();
        let formVariables: KeyValuePair = {};

        // Pre-fill FE/BE versions
        const environment = this.getEnvironmentFromHash(hashVariables);

        if (environment !== '') {
            formVariables['ENVIRONMENT'] = environment;
        }

        // Check for variables specified while triggering from another repository
        const triggerVariables = this.getTriggerVariablesFromHash(hashVariables);
        Object.assign(formVariables, triggerVariables);

        // Set all variables from hash to form
        this.setVariables(formVariables);
    }

    createButtons() {
        const runPipelineSection = $('[data-testid="run-pipeline-button"]').parent();
        runPipelineSection.before('<div style="margin-top: 10px" id="MONAR_E2E_VARIABLES_BUTTONS"></div>');

        pipelineButtons.forEach((button, index) => {
            const buttonHtml = $(`
                <a
                    class="btn btn-sm gl-mr-2"
                    style="background: ${colorForIndex(index)}"
                    id="MONAR_E2E_VARIABLES_BUTTON_${toUpper(snakeCase(button.label))}"
                >
                    <span> ${button.label}</span>
                </a>
            `);

            buttonHtml.on('click', async () => {
                if (!button.selected) {
                    button.selected = true;
                    await this.addButtonVariables(button.variables);
                    this.markButton(button, button.selected);
                } else {
                    button.selected = false;
                    await this.removeButtonVariables(button.variables);
                    this.markButton(button, button.selected);
                }
            });

            $('#MONAR_E2E_VARIABLES_BUTTONS').append(buttonHtml);
        });
    }

    async addButtonVariables(variables: PipelineButtonVariable[]) {
        await this.cacheCustomValuesFromInputs();

        variables.forEach(variable => {
            if (this.variableExists(variable.key)) {
                // Differentiate between variables which can contain multiple values
                if (isMultiValueVariable(variable.key)) {
                    const variableSeparator = getMultiValueVariableSeparator(variable.key);
                    const values = this.getVariableValue(variable.key).split(variableSeparator);
                    values.push(variable.value);
                    this.setVariableValue(variable.key, values.join(variableSeparator));
                } else {
                    this.setVariableValue(variable.key, variable.value);
                }
            } else {
                this.addVariables({ [variable.key]: variable.value });
            }
        });

        await this.refreshGUI();
    }

    async removeButtonVariables(variables: PipelineButtonVariable[]) {
        await this.cacheCustomValuesFromInputs();

        variables.forEach(variable => {
            if (isMultiValueVariable(variable.key)) {
                const variableSeparator = getMultiValueVariableSeparator(variable.key);
                const values = this.getVariableValue(variable.key).split(variableSeparator);
                const newValues = values.filter(value => value !== variable.value);

                if (newValues.length > 0) {
                    this.setVariableValue(variable.key, newValues.join(variableSeparator));
                } else {
                    this.removeVariables([variable.key]);
                }
            } else {
                this.removeVariables([variable.key]);
            }
        });

        await this.refreshGUI();
    }

    markButton(button: PipelineButton, selected: boolean) {
        const targetElement = $(`#MONAR_E2E_VARIABLES_BUTTON_${toUpper(snakeCase(button.label))} span`);
        targetElement.css({ 'border-color': selected ? '#222222' : 'transparent' });
    }
}
