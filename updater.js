const CODE_KEY = 'MONAR_JS_WEB_HACK_CODE';
const DEV_KEY = 'MONAR_JS_WEB_HACK_DEV';

const BASE_URL = 'https://raw.githubusercontent.com/qmOnArq/jsWebHacks/master/scripts/';
const DEV_BASE_URL = 'https://localhost:8080/';

const IS_DEV = !!localStorage.getItem(DEV_KEY);

function applyScript(url) {
    if (IS_DEV) {
        $.ajax(url).then(data => {
            eval(data);
        }).catch(console.error);
        return;
    }

    const codeCache = localStorage.getItem(CODE_KEY);
    if (codeCache) {
        eval(codeCache);
    }

    $.ajax(url).then(data => {
        localStorage.setItem(CODE_KEY, data);
        if (codeCache !== data) {
            $('body').append(`
            <div style="
                position: fixed;
                left: 50%;
                top: 20px;
                transform: translateX(-50%);
                z-index: 999999;
                background: orange;
                padding: 4px 10px;
                border-radius: 5px;
                font-size: 16px;
            ">
                Refresh to update script
            </div>
            `);
        }
    }).catch(console.error);
}

const script = ''; // e.g. 'gitlab.js';

applyScript((IS_DEV ? DEV_BASE_URL : BASE_URL) + script);
