const CODE_KEY = 'MONAR_JS_WEB_HACK_CODE';
const BASE_URL = 'https://raw.githubusercontent.com/qmOnArq/jsWebHacks/master/scripts/';

function applyScript(url) {
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

applyScript(BASE_URL + script);