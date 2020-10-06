import { PNPHelpers } from './scripts/helpers';

import isReadyToInitialize = PNPHelpers.isReadyToInitialize;
import initialize = PNPHelpers.initialize;

function attemptToInitialize() {
    if (isReadyToInitialize()) {
        initialize();
    }
}

setInterval(() => {
    attemptToInitialize();
}, 500);
