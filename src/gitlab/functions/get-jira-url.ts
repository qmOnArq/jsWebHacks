export function getJiraUrl() {
    return $('.shortcuts-external_tracker').attr('href') || '';
}
