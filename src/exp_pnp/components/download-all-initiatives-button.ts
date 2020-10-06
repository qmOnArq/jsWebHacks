import { InitiativeExportData, InitiativeListItem } from '../types/initiative.type';
import { asyncForEach } from '../../helpers';
import { PNPProject } from '../scripts/project-functions';
import { PNPHelpers } from '../scripts/helpers';
import { PNPInitiative } from '../scripts/initiative-functions';
import * as JSZipType from 'jszip';

import getMajorVersionString = PNPHelpers.getMajorVersionString;
import handleError = PNPHelpers.handleError;
import getInitiativeList = PNPInitiative.getInitiativeList;
import getInitiative = PNPInitiative.getInitiative;

declare const JSZip: JSZipType;

let total = 0;
let current = 0;

export namespace PNPDownloadAllButton {
    export const createDownloadButton = createButton;
    export const setDownloadButtonEnabled = setButtonEnabled;
}

function createButton() {
    if (document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER')) {
        return;
    }
    const button = document.createElement('e-ui-button');
    button.id = 'DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER';
    button.innerHTML = `
        <button class="button-wrapper" id="DOWNLOAD_ALL_INITIATIVES_BUTTON">
            <span id="DOWNLOAD_ALL_INITIATIVES_BUTTON_TEXT" class="button-text">Download all</span>
        </button>
    `;
    document.querySelector('.crud-header.list-header')!.appendChild(button);
    setButtonEnabled(false);
    updateButtonLabel();
}

function setButtonEnabled(enabled: boolean) {
    const wrapper = document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER');
    if (!wrapper) {
        return;
    }
    wrapper.classList.remove('disabled');
    if (!enabled) {
        wrapper.classList.add('disabled');
    }
    const button = document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER') as HTMLButtonElement;
    if (!button) {
        return;
    }
    if (enabled) {
        button.onclick = () => {
            exportAllInitiatives();
        };
    } else {
        button.onclick = null;
    }
}

function updateButtonLabel() {
    const text = document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_TEXT');
    if (!text) {
        return;
    }
    text.innerHTML = 'Download all';
    if (total > 0) {
        text.innerHTML += ` ${current} / ${total}`;
    }
}

async function exportAllInitiatives() {
    const project = PNPProject.getProjectData();
    if (!project) {
        handleError('Could not find Project ID');
        return;
    }
    const folderName = `${getMajorVersionString()}`;
    const zipName = `${getMajorVersionString()} - ${project.company_name} - Initiatives.zip`;
    setButtonEnabled(false);
    const list = await getInitiativeList(project._id);
    current = 0;
    total = list.length;
    updateButtonLabel();
    const failedInitiatives: [InitiativeListItem, InitiativeExportData | null][] = [];
    const zip = new JSZip();
    const folder = zip.folder(folderName)!;
    await asyncForEach(list, async initiative => {
        const initiativeData = await getInitiative(initiative._id, project._id);
        current++;
        updateButtonLabel();
        if (!initiativeData) {
            failedInitiatives.push([initiative, null]);
            return;
        }
        if (initiativeData.errors) {
            failedInitiatives.push([initiative, initiativeData]);
            return;
        }
        const name = initiative.name.replace(/\//g, '-').replace(/\\/g, '-');
        const data = JSON.stringify(initiativeData);
        const fileName = `${name}.json`;
        folder.file(fileName, data);
    });
    failedInitiatives.forEach(fail => {
        handleError(`${fail[0].name} (${fail[0]._id}) export failed`, fail[1]);
    });
    setButtonEnabled(true);
    total = 0;
    updateButtonLabel();
    return zip.generateAsync({ type: 'blob' }).then(content => {
        saveAs(content, zipName);
    });
}
