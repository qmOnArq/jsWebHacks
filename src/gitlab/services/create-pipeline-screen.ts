import { Deferred } from '../../deferred';
import { KeyValuePair } from '../../types/name-value-pair.type';
import retry, { asyncForEach, objectFilter } from '../../helpers';
import { isE2EPipelineVariable } from '../constants/e2e-pipeline-buttons.constant';

export default class CreatePipelineScreen {
    private static BRANCH_DROPDOWN = 'fieldset:eq(0) ul.dropdown-menu';
    private event = document.createEvent('HTMLEvents');
    private variables: KeyValuePair = {};

    constructor() {
        $(CreatePipelineScreen.BRANCH_DROPDOWN).on('click', () => {
            return this.refreshGUI();
        });

        // Remove variables from cache when manually deleted
        $('form').on('click', event => {
            // only user clicks, not jQuery clicks
            if (!event.originalEvent) return;

            const isRemoveBtn = $(event.target).is(this.getVariableRemoveRowButtonSelector());
            const isChildOfRemoveBtn = $(event.target).parents(this.getVariableRemoveRowButtonSelector());

            if (!isRemoveBtn && !isChildOfRemoveBtn) return;

            // remove removed key from our cache
            const variableKey = String(
                $(event.target)
                    .parents(this.getVariableRowSelector())
                    .find(this.getVariableInputSelector('key'))
                    .val(),
            );

            delete this.variables[variableKey];
        });
    }

    variableExists(key: string) {
        return key in this.variables;
    }

    getVariableValue(key: string) {
        if (key in this.variables) {
            return this.variables[key];
        } else {
            throw new Error(`${key} not found in pipeline variables!`);
        }
    }

    setVariableValue(key: string, newValue: string) {
        this.variables[key] = newValue;
    }

    setVariables(variables: KeyValuePair) {
        this.variables = variables;
        this.refreshGUI();
    }

    addVariables(variables: KeyValuePair) {
        Object.assign(this.variables, variables);
    }

    removeVariables(variableKeys: string[]) {
        this.variables = objectFilter(this.variables, ([key]) => !variableKeys.includes(key));
    }

    async refreshGUI() {
        await this.removeAllVariablesGUI();
        await asyncForEach(Object.entries(this.variables), async ([key, value]) => {
            return await this.addNewVariableGUI(key, value);
        });
    }

    private addNewVariableGUI(key: string, value: string): Promise<void> {
        const result = new Deferred<void>();

        this.getLastRow().then(([$lastKeyInput, $lastValueInput]) => {
            // Fill in variable key
            $lastKeyInput[0].dispatchEvent(this.inputEvent());
            $lastKeyInput.val(key);
            $lastKeyInput[0].dispatchEvent(this.changeEvent());

            // Fill in variable value
            $lastValueInput.val(value);
            $lastValueInput[0].dispatchEvent(this.inputEvent());

            result.resolve();
        });

        return result.promise;
    }

    private removeAllVariablesGUI(): Promise<void> {
        const result = new Deferred<void>();
        const $rows = $(this.getVariableRowSelector());

        asyncForEach($rows, async $row => {
            const variableKey = String(
                $($row)
                    .find(this.getVariableInputSelector('key'))
                    .val(),
            );

            // If current row is a custom variable, save it into cache
            if (variableKey && !this.variableExists(variableKey) && !isE2EPipelineVariable(variableKey)) {
                this.variables[variableKey] = String(
                    $($row)
                        .find(this.getVariableInputSelector('value'))
                        .val(),
                );
            }

            // Remove using the remove button
            $($row)
                .find(this.getVariableRemoveRowButtonSelector())
                .trigger('click');
        }).then(() => result.resolve());

        return result.promise;
    }

    private getLastRow(): Promise<JQuery[]> {
        const lastInput = new Deferred<JQuery[]>();

        // retry until last input is present and is not empty
        retry(
            () => {
                const $lastRow = $(this.getVariableRowSelector()).last();
                return Promise.resolve([
                    $lastRow.find(this.getVariableInputSelector('key')),
                    $lastRow.find(this.getVariableInputSelector('value')),
                ]);
            },
            ([$lastKeyInput]) => !!$lastKeyInput.length && !$lastKeyInput.val(),
            {
                maxTries: 20,
                waitingInterval: 500,
            },
        ).then(lastRowInputs => {
            lastInput.resolve(lastRowInputs);
        });

        return lastInput.promise;
    }

    private getVariableRowSelector() {
        return '*[data-testid="ci-variable-row"]';
    }

    private getVariableRemoveRowButtonSelector() {
        return '*[data-testid="remove-ci-variable-row"]';
    }

    private getVariableInputSelector(type: 'key' | 'value') {
        return `*[data-testid="pipeline-form-ci-variable-${type}"]`;
    }

    private inputEvent() {
        this.event.initEvent('input', true, true);
        return this.event;
    }

    private changeEvent() {
        this.event.initEvent('change', true, true);
        return this.event;
    }
}
