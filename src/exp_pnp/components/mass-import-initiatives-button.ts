import { PNPHelpers } from '../scripts/helpers';
import * as JSZipType from 'jszip';
import { asyncForEach, readFileAsText, sleep } from '../../helpers';
import { PNPProject } from '../scripts/project-functions';
import { PNPInitiative } from '../scripts/initiative-functions';

declare const JSZip: JSZipType;

let total = 0;
let current = 0;

export namespace PNPMassImportButton {
    export const create = createButton;
    export const setEnabled = setButtonEnabled;
}

function createButton() {
    if (document.querySelector('#IMPORT_ALL_INITIATIVES_BUTTON_WRAPPER')) {
        return;
    }
    const button = document.createElement('e-ui-button');
    button.id = 'IMPORT_ALL_INITIATIVES_BUTTON_WRAPPER';
    button.setAttribute('priority', 'secondary');
    button.classList.add('ui');
    button.classList.add('ui-node');
    button.innerHTML = `
        <button class="button-wrapper" id="IMPORT_ALL_INITIATIVES_BUTTON">
            <span id="IMPORT_ALL_INITIATIVES_BUTTON_TEXT" class="button-text">Mass import</span>
        </button>
    `;
    document.querySelector('.crud-header.list-header')!.appendChild(button);
    PNPHelpers.setButtonStatus(false);
    updateButtonLabel();
}

function setButtonEnabled(enabled: boolean) {
    const wrapper = document.querySelector('#IMPORT_ALL_INITIATIVES_BUTTON_WRAPPER');
    if (!wrapper) {
        return;
    }
    wrapper.classList.remove('disabled');
    if (!enabled) {
        wrapper.classList.add('disabled');
    }
    const button = document.querySelector('#IMPORT_ALL_INITIATIVES_BUTTON_WRAPPER') as HTMLButtonElement;
    if (!button) {
        return;
    }
    if (enabled) {
        button.onclick = () => {
            setModalVisible(true);
        };
    } else {
        button.onclick = null;
    }
}

function updateButtonLabel() {
    const text = document.querySelector('#IMPORT_ALL_INITIATIVES_BUTTON_TEXT');
    if (!text) {
        return;
    }
    text.innerHTML = 'Mass import';
    if (total > 0) {
        text.innerHTML += ` ${current} / ${total}`;
    }
}

async function startMassImport(files: FileList) {
    const project = PNPProject.getProjectData();
    if (!project) {
        PNPHelpers.handleError('Could not find Project ID');
        return;
    }

    total = 0;
    current = 0;

    updateButtonLabel();
    PNPHelpers.setButtonStatus(false);

    const jsons: string[] = [];
    const fails: unknown[] = [];

    await asyncForEach(files, async item => await handleFile(item));
    await asyncForEach(jsons, async json => await importJson(json));

    fails.forEach(fail => {
        PNPHelpers.handleError(`Import failed`, fail);
    });

    total = 0;
    updateButtonLabel();
    PNPHelpers.setButtonStatus(true);

    alert('Refresh the page to reload the list of initiatives');

    async function handleFile(file: File) {
        try {
            const zip = await JSZip.loadAsync(file);
            const fileKeys = Object.keys(zip.files);
            await asyncForEach(fileKeys, async fileKey => {
                const f = zip.files[fileKey];
                if (!f.dir) {
                    jsons.push(await f.async('text'));
                    total++;
                    updateButtonLabel();
                }
            });
        } catch (e) {
            // Not zip file
            jsons.push(await readFileAsText(file));
            total++;
            updateButtonLabel();
        }
    }

    async function importJson(json: string) {
        const result = await PNPInitiative.importInitiativeJson(json, project!._id);
        await sleep(500);
        current++;
        updateButtonLabel();

        if (result?.errors) {
            fails.push(result.errors);
            return;
        }
    }
}

function setModalVisible(open: boolean) {
    if (open) {
        createMassImportModal();
        const modal = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL') as HTMLElement;
        modal.style.display = 'block';
        const fileInput = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL_FILE_INPUT') as HTMLInputElement;
        fileInput.value = '';
        fileInput.onchange!(null as any);
    } else {
        const modal = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL') as HTMLElement | null;
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

function createMassImportModal() {
    if (document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL')) {
        return;
    }

    const wrapper = document.createElement('div');
    wrapper.id = 'IMPORT_ALL_INITIATIVES_MODAL';
    wrapper.style.position = 'fixed';
    wrapper.style.left = '0';
    wrapper.style.right = '0';
    wrapper.style.top = '0';
    wrapper.style.bottom = '0';
    wrapper.style.display = 'none';
    wrapper.innerHTML = `
        <div
            style="
                display: flex;
                align-items: flex-start;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 0;
                background-color: rgba(28,23,51,.8);
            "
        >
        </div>

        <div
            style="
                top: 10%;
                left: 50%;
                width: 560px;
                margin-left: -280px;
                background-color: #fff;
                border: 1px solid rgba(0,0,0,.3);
                border-radius: 4px;
                outline: 0;
                box-shadow: 0 3px 7px rgba(0,0,0,.3);
                background-clip: padding-box;
                position: fixed;
                overflow: visible;
            "
        >
            <div
                style="
                    border-bottom: 1px solid rgba(201,207,231,.5);
                    padding: 21px 25px 20px 30px;
                "
            >
                <h3
                    style="
                        padding: 0;
                        margin: 0;
                    "
                >Mass import initiatives</h3>
            </div>

            <div
                style="
                    padding: 15px 30px;
                    overflow-y: visible;
                    max-height: calc(100vh - 150px);
                    position: relative;
                "
            >
                <label
                    id="IMPORT_ALL_INITIATIVES_MODAL_FILE_LABEL"
                    style="
                        text-align: center;
                        background-color: #fafafd;
                        border: 1px dashed #d8ddef;
                        border-radius: 2px;
                        padding: 10px 20px;
                        box-sizing: border-box;
                        display: block;
                        position: relative;
                    "
                >
                    <span
                        style="
                            display: block;
                            font-weight: 700;
                            font-size: 14px;
                            color: #636696;
                            margin: 20px;
                        "
                    >
                        <span>Drag & drop (or click to open picker)</span>
                        <br>
                        <br>
                        <i style="font-weight: 400">.zip or single/multiple .json files allowed</i>
                        <br>
                        <br>
                        <span id="IMPORT_ALL_INITIATIVES_MODAL_FILE_INPUT_MESSAGE">No files selected</span>
                    </span>
                    <input
                        style="
                            position: absolute;
                            left: 0;
                            top: 0;
                            right: 0;
                            display: block;
                            bottom: 0;
                            width: 100%;
                            height: 100%;
                            opacity: 0;
                            cursor: pointer;
                        "
                        type="file" multiple id="IMPORT_ALL_INITIATIVES_MODAL_FILE_INPUT">
                </label>
            </div>

            <div
                style="
                    border-radius: 0 0 4px 4px;
                    padding: 12px 30px;
                    background: #f8f7fd;
                    margin-bottom: 0;
                    text-align: right;
                "
            >
                <e-ui-button class="ui ui-node" id="IMPORT_ALL_INITIATIVES_MODAL_CANCEL_BUTTON">
                    <button class="button-wrapper">
                        <span class="button-text">Cancel</span>
                    </button>
                </e-ui-button>

                <e-ui-button class="ui ui-node" priority="primary" id="IMPORT_ALL_INITIATIVES_MODAL_IMPORT_BUTTON">
                    <button class="button-wrapper">
                        <span class="button-text">Import</span>
                    </button>
                </e-ui-button>
            </div>
        </div>
    `;
    document.body.appendChild(wrapper);

    const cancelButton = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL_CANCEL_BUTTON') as HTMLButtonElement;
    cancelButton.onclick = () => setModalVisible(false);

    const fileInput = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL_FILE_INPUT') as HTMLInputElement;
    fileInput.onchange = () => {
        const isSelected = fileInput.files && fileInput.files.length > 0;
        let message = 'No files selected';
        if (isSelected) {
            message =
                fileInput.files!.length === 1
                    ? `${fileInput.files![0].name} selected`
                    : `${fileInput.files!.length} files selected`;
        }

        document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL_FILE_INPUT_MESSAGE')!.innerHTML = message;

        const wrapper = document.querySelector('#IMPORT_ALL_INITIATIVES_MODAL_IMPORT_BUTTON') as HTMLElement;
        wrapper.classList.remove('disabled');
        if (!isSelected) {
            wrapper.classList.add('disabled');
        }
        if (isSelected) {
            wrapper.onclick = () => {
                startMassImport(fileInput.files!);
                setModalVisible(false);
            };
        } else {
            wrapper.onclick = null;
        }
    };
}
