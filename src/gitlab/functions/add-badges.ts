import { isPullRequestViewPage } from './is-pull-request-view-page';

export function addBadges() {
    if (isPullRequestViewPage()) {
        return;
    }

    if (
        window.monar_GLOBALS.projectId &&
        window.monar.versionData?.versionData &&
        $('#monar-pipelines-global').length === 0
    ) {
        let badges = '';

        badges += '<table style="display: inline-block">';

        badges += `<tr>`;
        badges += `<td style="padding-left: 10px; text-align: right;">
                    <img src="${getBadgeUrl('branches', '')}" alt="Branches" />
                    </td>`;
        for (const version of [...window.monar.versionData.versions, 'master']) {
            const value = window.monar.versionData.versionData[version];

            badges += `
                <td style="padding-left: 10px; text-align: left;">
                    <a href="${value.pipeline?.web_url}">
                        <img src="${getBadgeUrl(value.pipeline?.status as any, value.branch.name)}" alt="${
                value.branch.name
            }" />
                    </a>
                </td>
            `;
        }
        badges += `</tr>`;

        badges += `<tr>`;
        badges += `<td style="padding-left: 10px; text-align: right;">
                    <img src="${getBadgeUrl('tags', '')}" alt="Branches" />
                    </td>`;
        for (const version of [...window.monar.versionData.versions, 'master']) {
            const value = window.monar.versionData.versionData[version];

            if (value.tag) {
                badges += `
                <td style="padding-left: 10px; text-align: left;">
                    <a href="${window.monar_GLOBALS.project}/tags/${value.tag.name}">
                        <img src="${getBadgeUrl(value.tag?.name as any, value.tag.name)}" alt="${value.tag.name}" />
                    </a>
                </td>
            `;
            } else {
                badges += '<td style="padding-left: 10px; text-align: left;"></td>';
            }
        }
        badges += `</tr>`;

        badges += `<tr>`;
        badges += `<td style="padding-left: 10px; text-align: right;">
                    <img src="${getBadgeUrl('nightly', '')}" alt="nightly" />
                    </td>`;

        for (const version of [...window.monar.versionData.versions, 'master']) {
            const value = window.monar.versionData.versionData[version];

            badges += `<td style="padding-left: 10px; text-align: left;">`;
            if (value.nightly) {
                badges += `
                <a href="${value.nightly.web_url}">
                    <img src="${getBadgeUrl(value.nightly.status, value.nightly.ref)}" alt="${value.nightly.ref}" />
                </a>
                `;
            }
            badges += `</td>`;
        }
        badges += `</tr>`;

        badges += '</table>';

        $('nav.breadcrumbs .breadcrumbs-container').append(`
            <div id="monar-pipelines-global">
                ${badges}
            </div>
        `);
    }
}

function getBadgeUrl(status: PipelineStatus, text: string) {
    const color =
        {
            running: 'blue',
            pending: 'blue',
            success: 'brightgreen',
            failed: 'red',
            canceled: 'lightgrey',
            skipped: 'lightgrey',
            nightly: 'orange',
            latest: 'orange',
            undefined: 'lightgrey',
            branches: 'orange',
            tags: 'orange',
        }[status] || 'brightgreen';

    const statusWord =
        {
            running: 'running',
            pending: 'pending',
            success: 'passed',
            failed: 'failed',
            canceled: 'canceled',
            skipped: 'skipped',
            nightly: 'nightly',
            latest: 'latest',
            undefined: 'unknown',
            branches: 'branches',
            tags: 'tags',
        }[status] || '';

    return `https://img.shields.io/badge/${text}-${statusWord}-${color}.svg`;
}

export type PipelineStatus =
    | 'running'
    | 'pending'
    | 'success'
    | 'failed'
    | 'canceled'
    | 'skipped'
    | 'nightly'
    | 'latest'
    | 'branches'
    | 'tags'
    | 'undefined';
