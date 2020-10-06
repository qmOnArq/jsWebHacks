import { InitiativeExportData, InitiativeListItem } from './initiative.type';
import * as JSZipType from 'jszip';

declare const JSZip: JSZipType

function handleError(message: string, error?: unknown) {
    if (!document.querySelector('#PLUG_AND_PLAY_INITIATIVES_ERROR_WRAPPER')) {
        const div = document.createElement('div');
        div.id = 'PLUG_AND_PLAY_INITIATIVES_ERROR_WRAPPER';
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '50%';
        div.style.transform = 'translateX(-50%)';
        document.body.appendChild(div);
    }
    const wrapper = document.querySelector('#PLUG_AND_PLAY_INITIATIVES_ERROR_WRAPPER')!;
    const e = document.createElement('div');
    e.style.textAlign = 'center';
    e.style.marginTop = '10px';
    e.style.background = '#fab3c3';
    e.style.padding = '10px 20px';
    e.style.borderRadius = '4px';
    e.style.position = 'relative';
    errorId++;
    e.id = `DOWNLOAD_ALL_INITIATIVES_ERROR_${errorId}`;
    e.innerHTML += `<b style="color: rgba(242, 65, 101, 1); font-size: 100%;">Error ${errorId}</b>`;
    e.innerHTML += `<span style="display: block">${message}</span>`;
    if (error) {
        e.innerHTML += `<i style="display: block;font-size: 80%;">Details in Dev. console</i>`;
    }
    e.innerHTML += `<b style="position: absolute; right: 0; top: 0; padding: 5px; display: block; cursor: pointer; opacity: 0.5;" onclick="
    document.querySelector('#DOWNLOAD_ALL_INITIATIVES_ERROR_${errorId}').remove()
  ">X</b>`;
    wrapper.appendChild(e);
    if (error) {
        console.error(`Error ${errorId}`, error);
    }
}

function appendScript(url: string, id: string) {
    if (document.querySelector(`#PLUG_AND_PLAY_INITIATIVES_SCRIPT_${id}`)) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        const head = document.getElementsByTagName('head')[0];
        const theScript = document.createElement('script');
        theScript.type = 'text/javascript';
        theScript.src = url;
        theScript.id = `PLUG_AND_PLAY_INITIATIVES_SCRIPT_${id}`;
        (theScript as any).onreadystatechange = () => resolve();
        theScript.onload = () => resolve();
        head.appendChild(theScript);
    });
}

function getSlug() {
    const regexResult = location.pathname.match(/\/p\/([^/]+)/);
    if (!regexResult) {
        return null;
    }
    return regexResult[1];
}

function getProjectData() {
    const slug = getSlug();
    if (!slug) {
        return null;
    }

    return (window.globalCompanies || []).find(company => company.slug === slug);
}

function getMajorVersionString() {
    const fullVersion = (window.globalFrontendConfig || {}).app_frontend_version || '';
    if (!fullVersion) {
        return 'unknown';
    }
    const parts = fullVersion.split('.');
    return parts[0] + '.' + parts[1];
}

async function asyncForEach<T>(array: T[], callback: (item: T, index: number, list: T[]) => Promise<unknown>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function getListUrl(projectId: string) {
    return `/api/initiatives?company_id=${projectId}`;
}

function getInitiativeExportUrl(initiativeId: string, projectId: string) {
    return `/api/project/data-management/initiatives/${initiativeId}/export?company_id=${projectId}`;
}

function getInitiativeList(projectId: string) {
    return fetch(getListUrl(projectId), { credentials: 'same-origin' })
        .then(response => response.json())
        .then(response => response.data as InitiativeListItem[])
        .catch(error => {
            handleError('Could not download Initiative list', error);
            return [] as InitiativeListItem[];
        });
}

function getInitiative(initiativeId: string, projectId: string) {
    return fetch(getInitiativeExportUrl(initiativeId, projectId), {
        credentials: 'same-origin',
    })
        .then(response => response.json() as InitiativeExportData)
        .catch(error => {
            handleError(`Could not download Initiative ${initiativeId}`, error);
            return null;
        });
}

async function exportAllInitiatives() {
    const project = getProjectData();
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

async function initialize() {
    createButton();
    await appendScript(`//cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js`, 'jszip');
    await appendScript(`//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js`, 'filesaver');
    setButtonEnabled(true);
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

function isReadyToInitialize() {
    return (
        !!document.querySelector('.crud-header.list-header') &&
        location.pathname.endsWith('/initiatives') &&
        !document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER')
    );
}

let total = 0;
let current = 0;
let errorId = 0;

function attemptToInitialize() {
    if (isReadyToInitialize()) {
        initialize();
    }
}

setInterval(() => {
    attemptToInitialize();
}, 500);
