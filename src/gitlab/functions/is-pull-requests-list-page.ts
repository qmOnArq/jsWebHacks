export function isPullRequestsListPage() {
    return $('div.merge-request').length === 1;
}
