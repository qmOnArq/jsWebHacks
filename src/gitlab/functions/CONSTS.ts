export function CONSTS_STRINGS(type: keyof typeof consts_strings) {
    return consts_strings[type];
}

export function CONSTS_CSS(type: keyof typeof consts_css) {
    return consts_css[type];
}

export const REPLACE = `{{REPLACE}}`;

export const FADE_SPEED = 200;

const consts_strings = {
    green: '#1aaa55',
    red: '#db3b21',
    orange: '#fc9403',
    blue: '#1f78d1',

    changed: `
        <div class="diff-stats-group" style="display: inline-block; transform: scale(0.8);">
            <strong>~${REPLACE}</strong>
        </div>`,

    added: `
        <div class="diff-stats-group gl-text-green-600" style="display: inline-block; transform: scale(0.8);">
            <strong>+${REPLACE}</strong>
        </div>`,
    removed: `
        <div class="diff-stats-group gl-text-red-500" style="display: inline-block; transform: scale(0.8);">
            <strong>-${REPLACE}</strong>
        </div>`,

    authorPhotoHTML:
        '<div class="monar-author-photo"><div style="width: 100%; height: 100%; background-size: contain;"></div></div>',
};

const consts_css = {
    tagsElement: {
        display: 'inline-block',
        'margin-top': 0,
        'margin-left': '0.125rem',
    },
    feebas: {
        'background-image':
            'url("https://github.com/timzatko/feebas/blob/master/packages/desktop_app/src/favicon.256x256.png?raw=true")',
        'background-repeat': 'no-repeat',
        'background-size': 'contain',
        'background-origin': 'content-box',
        padding: '4px',
        width: '40px',
        height: '40px',
        'border-radius': '50%',
        border: '1px solid #1aaa55',
        'box-sizing': 'border-box',
        'background-color': 'transparent',
    },

    markedTarget: {
        'border-radius': '3px',
        display: 'inline-block',
        padding: '0 4px 0 2px',
    },

    upvoteIcon: {
        color: 'green',
        position: 'absolute',
        right: '280px',
        top: '11px',
        'margin-right': '0',
    },

    downvoteIcon: {
        color: 'red',
        position: 'absolute',
        right: '330px',
        top: '11px',
        'margin-right': '0',
    },

    conflictIcon: {
        color: 'red',
        position: 'absolute',
        right: '40px',
        top: '13px',
    },

    authorPhoto: {
        'margin-top': '10px',
        display: 'block',
        width: '24px',
        height: '24px',
        'background-color': 'gray',
        'background-size': 'contain',
        'border-radius': '50%',
        'margin-right': '15px',
        overflow: 'hidden',
    },

    reviewerPhoto: {
        width: '24px',
        height: '24px',
    },

    reviewerWrapper: {
        position: 'absolute',
        right: '70px',
        top: '8px',
    },

    pipelineWrapper: {
        position: 'absolute',
        right: '15px',
        'margin-right': 0,
        top: '12px',
    },

    commentsWrapper: {
        position: 'absolute',
        right: '210px',
        top: '11px',
    },

    updatedAtWrapper: {
        position: 'absolute',
        opacity: '0.5',
        right: '15px',
        bottom: '8px',
    },

    titleBase: {
        color: 'rgb(0, 82, 204)',
        'font-weight': 'normal',
    },

    statusWrapper: {
        position: 'absolute',
        right: '100px',
        top: '11px',
    },

    approvedBg: {
        'background-color': 'rgba(105, 209, 0, 0.05)',
    },

    systemBg: {
        'background-color': 'rgba(66, 139, 202, 0.05)',
    },
} as const;
