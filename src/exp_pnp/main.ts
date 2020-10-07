import { PNPHelpers } from './scripts/helpers';

function attemptToInitialize() {
    if (PNPHelpers.isReadyToInitialize()) {
        PNPHelpers.initialize();
    }
}

setInterval(() => {
    attemptToInitialize();
}, 500);
