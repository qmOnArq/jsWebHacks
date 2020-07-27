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
import { enhanceE2eCreatePipelineScreen } from './functions/e2e-create-pipeline-enhancements';

window.toggleUntaggedMerges = toggleUntaggedMerges;
window.hidePrStuff = hidePrStuff;

let startFails = 0;

function start() {
    if (!window.gon || !window.gl || !window.gl.projectOptions) {
        startFails++;
        if (startFails < 5) {
            setTimeout(() => start(), 50);
        }
        return;
    }

    window.monar = {};

    window.monar_GLOBALS = {
        id: window.gon.current_user_id,
        username: window.gon.current_username,
        name: window.gon.current_user_fullname,
        avatar: window.gon.current_user_avatar_url,
        defaultAvatar: window.gon.default_avatar_url,

        untaggedMerges: [],

        project: window.gl.projectOptions[Object.keys(window.gl.projectOptions)[0]].issuesPath
            ? window.gl.projectOptions[Object.keys(window.gl.projectOptions)[0]].issuesPath.replace('/issues', '')
            : '',
        projectId: getProjectId(),

        internalUsername: 'user.of.system',
        MR_LIMITS: {
            warning: 15,
            danger: 28,
            blink: 38,
        },
    };

    loadSettings();

    if (window.monar_GLOBALS.project) {
        addCustomStyles();

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
            enhanceE2eCreatePipelineScreen();
        });
    }
}

start();
