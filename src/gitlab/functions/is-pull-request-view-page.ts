export function isPullRequestViewPage() {
    return $('#content-body .merge-request .merge-request-details').length === 1;
}
