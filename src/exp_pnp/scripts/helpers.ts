import { PNPDownloadAllButton } from "../components/download-all-initiatives-button";

let errorId = 0;

export namespace PNPHelpers {
    export function appendScript(url: string, id: string) {
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

    export function handleError(message: string, error?: unknown) {
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

    export function getMajorVersionString() {
        const fullVersion = (window.globalFrontendConfig || {}).app_frontend_version || '';
        if (!fullVersion) {
            return 'unknown';
        }
        const parts = fullVersion.split('.');
        return parts[0] + '.' + parts[1];
    }

    export function isReadyToInitialize() {
        return (
            !!document.querySelector('.crud-header.list-header') &&
            location.pathname.endsWith('/initiatives') &&
            !document.querySelector('#DOWNLOAD_ALL_INITIATIVES_BUTTON_WRAPPER')
        );
    }

    export async function initialize() {
        PNPDownloadAllButton.createDownloadButton();
        await appendScript(`//cdnjs.cloudflare.com/ajax/libs/jszip/3.5.0/jszip.min.js`, 'jszip');
        await appendScript(`//cdn.jsdelivr.net/npm/file-saver@2.0.2/dist/FileSaver.min.js`, 'filesaver');
        PNPDownloadAllButton.setDownloadButtonEnabled(true);
    }
}
