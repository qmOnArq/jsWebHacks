import { CommitApprovals } from '../services/commit-approvals';

export function prettifyPullRequestCommitPage() {
    if (!getCommitIdFromUrl()) {
        return;
    }

    // approve commit
    // TODO
    // createApproveCommitButton();
}

function createApproveCommitButton() {
    if (!window.gl || !window.gl.mrWidgetData || !window.gl.mrWidgetData.iid) {
        return;
    }

    if (!window.monar_MR_DATA) {
        return;
    }

    const approvals = window.monar_MR_DATA.approvals;
    const commitId = getCommitIdFromUrl();
    const commitApprovals = approvals[commitId] || [];
    const isApprovedByYou = commitApprovals.some(approval => approval.username === window.monar_GLOBALS.username);

    $('#MONAR_APPROVE_COMMIT').remove();
    const $button = $(`
        <button id="MONAR_APPROVE_COMMIT" type="button" class="btn ${
            isApprovedByYou ? 'btn-warning btn-inverted' : 'btn-primary'
        }" variant="primary" size="sm" style="float: right;">
            ${isApprovedByYou ? 'Revoke commit approval' : 'Approve commit'}
        </button>
    `);
    $button.on('click', function() {
        $(this).off('click');
        $(this).addClass('disabled');
        CommitApprovals.toggleCommitApproval(window.gl.mrWidgetData.iid, commitId).then(() => {
            createApproveCommitButton();
        });
    });
    $('.detail-page-description').prepend($button);
}

function getCommitIdFromUrl() {
    const result = /commit_id=([0-9a-zA-Z]+)/.exec(location.search);
    return result ? result[1] : '';
}
