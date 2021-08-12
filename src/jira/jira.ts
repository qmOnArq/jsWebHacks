import addBranchLinks from './functions/add-branch-links';

let startFails = 0;

function start() {
    if (!window.jira) {
        startFails++;
        if (startFails < 5) {
            setTimeout(() => start(), 50);
        }
        return;
    }

    console.log('JIRA plugin started');
    addBranchLinks();
}

start();
