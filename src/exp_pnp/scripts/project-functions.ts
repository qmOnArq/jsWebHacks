export namespace PNPProject {
    export function getProjectSlug() {
        const regexResult = location.pathname.match(/\/p\/([^/]+)/);
        if (!regexResult) {
            return null;
        }
        return regexResult[1];
    }

    export function getProjectData() {
        const slug = getProjectSlug();
        if (!slug) {
            return null;
        }

        return (window.globalCompanies || []).find(company => company.slug === slug);
    }
}
