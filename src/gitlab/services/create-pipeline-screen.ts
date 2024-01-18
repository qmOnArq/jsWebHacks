import { Deferred } from '../../deferred';
import { KeyValuePair } from '../../types/name-value-pair.type';
import retry, { asyncForEach, objectFilter } from '../../helpers';

export default class CreatePipelineScreen {
    private static BRANCH_DROPDOWN_TOGGLE_BTN = 'fieldset:eq(0) button[data-testid="base-dropdown-toggle"]';
    private static BRANCH_DROPDOWN_MENU = 'fieldset:eq(0) *[data-testid="base-dropdown-menu"] ul';

    private event = document.createEvent('HTMLEvents');
    private variables: KeyValuePair = {};

    constructor() {
        // Cache variables on toggle click before changing branches
        $(CreatePipelineScreen.BRANCH_DROPDOWN_TOGGLE_BTN).on('click', async $event => {
            await this.cacheCustomValuesFromInputs();
        });

        // Mirror state in GUI after the branch has been changed
        $(CreatePipelineScreen.BRANCH_DROPDOWN_MENU).on('click', async () => {
            await this.refreshGUI();
        });

        // Remove variables from cache when manually deleted in GUI
        $('form').on('click', event => {
            // only user clicks, not jQuery clicks
            if (!event.originalEvent) return;

            const isRemoveBtn = $(event.target).is(this.getVariableRemoveRowButtonSelector());
            const isChildOfRemoveBtn = $(event.target).parents(this.getVariableRemoveRowButtonSelector()).length;

            // clicked in form, but not on remove button
            if (!isRemoveBtn && !isChildOfRemoveBtn) return;

            // remove removed key from our cache
            const variableKey = String(
                $(event.target).parents(this.getVariableRowSelector()).find(this.getVariableInputSelector('key')).val(),
            );

            delete this.variables[variableKey];

            window.monar_GLOBALS.eventEmitter.dispatchEvent(
                new CustomEvent('variableRemoved', { detail: { variableKey } }),
            );
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

    protected async refreshGUI() {
        await this.removeAllVariablesGUI();
        await asyncForEach(Object.entries(this.variables), async ([key, value]) => {
            return await this.addNewVariableGUI(key, value);
        });
    }

    protected cacheCustomValuesFromInputs() {
        return this.iterateThroughGUIVariables($row => {
            const variableKey = String($($row).find(this.getVariableInputSelector('key')).val());
            const variableValue = String($($row).find(this.getVariableInputSelector('value')).val());

            // Cache variable value
            if (variableKey) {
                this.variables[variableKey] = variableValue;
            }
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
        return this.iterateThroughGUIVariables($row => {
            // Remove using the remove button
            $($row).find(this.getVariableRemoveRowButtonSelector()).trigger('click');
        });
    }

    private iterateThroughGUIVariables(callback: ($row: HTMLElement) => Promise<any> | void) {
        const result = new Deferred<void>();
        const $rows = $(this.getVariableRowSelector());

        asyncForEach($rows, async $row => {
            return callback($row);
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
        return '*[data-testid="ci-variable-row-container"]';
    }

    private getVariableRemoveRowButtonSelector() {
        return 'button[data-testid="remove-ci-variable-row"]';
    }

    private getVariableInputSelector(type: 'key' | 'value') {
        return `*[data-testid="pipeline-form-ci-variable-${type}-field"]`;
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
