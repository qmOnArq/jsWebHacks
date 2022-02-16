import { InitiativeExportData, InitiativeListItem } from '../types/initiative.type';
import { asyncForEach } from '../../helpers';
import { PNPProject } from '../scripts/project-functions';
import { PNPHelpers } from '../scripts/helpers';
import { PNPInitiative } from '../scripts/initiative-functions';

let total = 0;
let current = 0;

export namespace PNPDeleteAllButton {
    export const create = createButton;
    export const setEnabled = setButtonEnabled;
}

function createButton() {
    if (document.querySelector('#DELETE_ALL_INITIATIVES_BUTTON_WRAPPER')) {
        return;
    }
    const button = document.createElement('e-ui-button');
    button.id = 'DELETE_ALL_INITIATIVES_BUTTON_WRAPPER';
    button.setAttribute('priority', 'danger');
    button.classList.add('ui');
    button.classList.add('ui-node');
    button.innerHTML = `
        <button class="button-wrapper" id="DELETE_ALL_INITIATIVES_BUTTON">
            <span id="DELETE_ALL_INITIATIVES_BUTTON_TEXT" class="button-text">Delete all</span>
        </button>
    `;
    document.querySelector(PNPHelpers.headerSelector)!.prepend(button);
    PNPHelpers.setButtonStatus(false);
    updateButtonLabel();
}

function setButtonEnabled(enabled: boolean) {
    const wrapper = document.querySelector('#DELETE_ALL_INITIATIVES_BUTTON_WRAPPER');
    if (!wrapper) {
        return;
    }
    wrapper.classList.remove('disabled');
    if (!enabled) {
        wrapper.classList.add('disabled');
    }
    const button = document.querySelector('#DELETE_ALL_INITIATIVES_BUTTON_WRAPPER') as HTMLButtonElement;
    if (!button) {
        return;
    }
    if (enabled) {
        button.onclick = () => {
            deleteAllInitiatives();
        };
    } else {
        button.onclick = null;
    }
}

function updateButtonLabel() {
    const text = document.querySelector('#DELETE_ALL_INITIATIVES_BUTTON_TEXT');
    if (!text) {
        return;
    }
    text.innerHTML = 'Delete all';
    if (total > 0) {
        text.innerHTML += ` ${current} / ${total}`;
    }
}

async function deleteAllInitiatives() {
    const project = PNPProject.getProjectData();
    if (!project) {
        PNPHelpers.handleError('Could not find Project ID');
        return;
    }
    PNPHelpers.setButtonStatus(false);
    const list = await PNPInitiative.getInitiativeList(project._id);
    current = 0;
    total = list.length;

    if (
        prompt(
            `You are about to delete ${total} initiative${total > 1 ? 's' : ''}. Rewrite the amount to continue.`,
        ) !== `${total}`
    ) {
        alert('Canceling deletion');
        PNPHelpers.setButtonStatus(true);
        return;
    }

    updateButtonLabel();
    const failedInitiatives: [InitiativeListItem, InitiativeExportData | null][] = [];

    await asyncForEach(list, async initiative => {
        const response = await PNPInitiative.deleteInitiative(initiative._id, project._id);
        current++;
        updateButtonLabel();
        if (!response) {
            failedInitiatives.push([initiative, null]);
            return;
        }
        if (!response.success) {
            failedInitiatives.push([initiative, null]);
            return;
        }
    });
    failedInitiatives.forEach(fail => {
        PNPHelpers.handleError(`${fail[0].name} (${fail[0]._id}) delete failed`, fail[1]);
    });
    PNPHelpers.setButtonStatus(true);
    total = 0;
    updateButtonLabel();

    alert('Refresh the page to reload the list of initiatives');
}
