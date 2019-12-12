export function getProjectId() {
    return $('#search_project_id')[0] ? ($('#search_project_id')[0] as HTMLInputElement).value : '';
}
