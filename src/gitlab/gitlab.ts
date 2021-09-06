import { formatPullRequest } from './functions/format-pull-request';
import { getProjectId } from './functions/get-project-id';
import { loadSettings } from './functions/save-load-settings';
import { hidePrStuff } from './functions/hide-pr-stuff';
import { parseHtmlPullRequests } from './functions/parse-html-pull-requests';
import { prettifyCreatePullRequestPage } from './functions/prettify-create-pull-request-page';
import { addBadges } from './functions/add-badges';
import { colorMergeRequestNumbers } from './functions/color-merge-request-numbers';
import { prettifyCommitList } from './functions/prettify-commit-list';
import { toggleUntaggedMerges } from './functions/toggle-untagged-merges';
import { prettifyPullRequestPage } from './functions/prettify-pull-request-page';
import { addCustomStyles } from './functions/add-custom-styles';
import { prettifyPullRequestCommitPage } from './functions/prettify-pull-request-commit-page';
import { CommentParser } from './services/comment-parser';
import { Changelog } from './functions/changelog';
import createChangelogUI = Changelog.createOpenChangelogButton;
import { BranchingVersions } from './services/branching-versions';
import { enhanceCreatePipelineScreen } from './functions/e2e-create-pipeline-enhancements';
import { loadScript } from './functions/load-script';

window.toggleUntaggedMerges = toggleUntaggedMerges;
window.hidePrStuff = hidePrStuff;

let startFails = 0;

function start() {
    if (!window.gon || !window.gl || !window.uploads_path) {
        startFails++;
        if (startFails < 5) {
            setTimeout(() => start(), 50);
        }
        return;
    }

    console.log('Gitlab plugin started');

    window.monar = {};

    window.monar_GLOBALS = {
        id: window.gon.current_user_id,
        username: window.gon.current_username,
        name: window.gon.current_user_fullname,
        avatar: window.gon.current_user_avatar_url,
        defaultAvatar: window.gon.default_avatar_url,

        untaggedMerges: [],

        project: (window.uploads_path || '').replace('/uploads', ''),
        projectId: getProjectId(),

        internalUsername: 'user.of.system',
        MR_LIMITS: {
            warning: 15,
            danger: 28,
            blink: 38,
        },

        eventEmitter: new EventTarget(),
    };

    loadSettings();

    if (window.monar_GLOBALS.project) {
        addCustomStyles();


        loadScript('https://code.jquery.com/jquery-3.6.0.min.js').then(() =>
            Promise.all([
                CommentParser.fetchMergeRequestCommentData(window?.gl?.mrWidgetData?.iid),
                BranchingVersions.initialize(),
            ]).then(() => {
                createChangelogUI();
                parseHtmlPullRequests().forEach(formatPullRequest);
                prettifyPullRequestPage();
                prettifyCommitList();
                prettifyCreatePullRequestPage();
                BranchingVersions.fetchMoreDetails().then(() => addBadges());
                colorMergeRequestNumbers();
                prettifyPullRequestCommitPage();
                enhanceCreatePipelineScreen();
            }),
        );
    }
}

start();
