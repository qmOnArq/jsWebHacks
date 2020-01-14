import { isFrontend } from './is-frontend';
import { createFeebasCommitButtons } from './feebas';

export function prettifyCommitList() {
    // Feebas - main
    if (isFrontend()) {
        createFeebasCommitButtons();
    }
}
