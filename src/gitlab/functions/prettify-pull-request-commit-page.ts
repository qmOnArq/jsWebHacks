export function prettifyPullRequestCommitPage() {
    if (!$('.mr-version-controls').text().includes('Viewing commit')) {
        return;
    }

    // approve commit
    // TODO
    // createApproveCommitButton();
}

function createApproveCommitButton() {
    $('#MONAR_APPROVE_COMMIT').remove();
    const $button = $(`
        <button id="MONAR_APPROVE_COMMIT" type="button" class="btn btn-primary" variant="primary" size="sm" style="float: right;">
            Approve commit
        </button>
    `);
    $('.detail-page-description').prepend($button);
}
