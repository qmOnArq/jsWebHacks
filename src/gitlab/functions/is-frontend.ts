export function isFrontend() {
    return window.monar_GLOBALS.project === '/app/frontend';
}

export function test() {
    const date = new Date();
    if (date.getMonth() === 3 && date.getDate() === 1) {
        if (localStorage.getItem('no_geese_allowed') == null) {
            require('../test.min.js');
        }
    }
}
