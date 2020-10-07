import { InitiativeExportData, InitiativeListItem } from '../types/initiative.type';
import { PNPHelpers } from './helpers';

export namespace PNPInitiative {
    export function getInitiativeListUrl(projectId: string) {
        return `/api/initiatives?company_id=${projectId}`;
    }

    export function getInitiativeExportUrl(initiativeId: string, projectId: string) {
        return `/api/project/data-management/initiatives/${initiativeId}/export?company_id=${projectId}`;
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
            .then(response => response.json() as InitiativeExportData)
            .catch(error => {
                PNPHelpers.handleError(`Could not download Initiative ${initiativeId}`, error);
                return null;
            });
    }
}
