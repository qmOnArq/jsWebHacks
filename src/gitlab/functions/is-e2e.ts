export function isE2ERepository() {
    return window.monar_GLOBALS.project === '/e2e/e2e-tests' || window.monar_GLOBALS.project === '/qa/test-hub';
}
