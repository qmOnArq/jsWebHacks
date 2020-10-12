import { InitiativeExportData, InitiativeImportData, InitiativeListItem } from '../types/initiative.type';
import { PNPHelpers } from './helpers';

export namespace PNPInitiative {
    export function getInitiativeListUrl(projectId: string) {
        return `/api/initiatives?company_id=${projectId}`;
    }

    export function getInitiativeExportUrl(initiativeId: string, projectId: string) {
        return `/api/project/data-management/initiatives/${initiativeId}/export?company_id=${projectId}`;
    }

    export function getInitiativeDeleteUrl(initiativeId: string, projectId: string) {
        return `/api/initiatives/${initiativeId}?company_id=${projectId}`;
    }

    export function getInitiativeImportUrl(projectId: string) {
        return `/api/project/data-management/initiatives/import?company_id=${projectId}`;
    }

    export function getInitiativeList(projectId: string) {
        return fetch(getInitiativeListUrl(projectId), { credentials: 'same-origin' })
            .then(response => response.json())
            .then(response => response.data as InitiativeListItem[])
            .catch(error => {
                PNPHelpers.handleError('Could not download Initiative list', error);
                return [] as InitiativeListItem[];
            });
    }

    export function getInitiative(initiativeId: string, projectId: string) {
        return fetch(getInitiativeExportUrl(initiativeId, projectId), {
            credentials: 'same-origin',
        })
            .then(response => response.json() as Promise<InitiativeExportData>)
            .catch(error => {
                PNPHelpers.handleError(`Could not download Initiative ${initiativeId}`, error);
                return null;
            });
    }

    export function deleteInitiative(initiativeId: string, projectId: string) {
        return fetch(getInitiativeDeleteUrl(initiativeId, projectId), {
            credentials: 'same-origin',
            method: 'DELETE',
        })
            .then(response => response.json() as Promise<{ success: boolean }>)
            .catch(error => {
                PNPHelpers.handleError(`Could not delete Initiative ${initiativeId}`, error);
                return { success: false };
            });
    }

    export function importInitiativeJson(json: string, projectId: string) {
        const blob = new Blob([json], { type: 'application/json' });
        const fileOfBlob = new File([blob], 'file.json');
        const formData = new FormData();
        formData.append('files', fileOfBlob);

        return fetch(getInitiativeImportUrl(projectId), {
            credentials: 'same-origin',
            method: 'POST',
            body: formData,
        })
            .then(response => response.json() as Promise<InitiativeImportData>)
            .catch(error => {
                PNPHelpers.handleError(`Could not import Initiative`, error);
                return null;
            });
    }
}
