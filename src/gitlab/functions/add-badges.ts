import { isPullRequestViewPage } from './is-pull-request-view-page';
import { isFrontend } from './is-frontend';

export function addBadges() {
    if (isPullRequestViewPage()) {
        return;
    }

    if (window.monar_GLOBALS.projectId) {
        const latest = Promise.all([
            fetchPipelineData({ ref: 'prod' }).then(data => (data || [{}])[0]),
            fetchPipelineData({ ref: 'qa' }).then(data => (data || [{}])[0]),
            fetchPipelineData({ ref: 'master' }).then(data => (data || [{}])[0]),
            fetchPipelineData({ ref: 'cloud' }).then(data => (data || [{}])[0]),
        ]).then(data => ({ prod: data[0], qa: data[1], master: data[2], cloud: data[3] }));

        const nightly = fetchPipelineData({ username: window.monar_GLOBALS.internalUsername }).then(data => {
            let prod, qa, master, cloud;
            for (let i = 0; i < (data || []).length; i++) {
                const item = data[i];
                if (item.ref === 'master' && !master) {
                    master = item;
                }
                if (item.ref === 'qa' && !qa) {
                    qa = item;
                }
                if (item.ref === 'prod' && !prod) {
                    prod = item;
                }
                if (item.ref === 'cloud' && !cloud) {
                    cloud = item;
                }
                if (master && qa && prod && cloud) {
                    break;
                }
            }

            return { prod: prod || {}, qa: qa || {}, master: master || {}, cloud: cloud || {} };
        });

        const latestTag = $.ajax(`/api/v4/projects/${window.monar_GLOBALS.projectId}/repository/tags`).then(
            data => data || [{}],
        );
        const prodCommits = $.ajax(
            `/api/v4/projects/${window.monar_GLOBALS.projectId}/repository/commits?ref_name=prod&per_page=100`,
        );

        Promise.all([latest, nightly, latestTag, prodCommits])
            .then(data => ({
                latest: data[0],
                nightly: data[1],
                tags: data[2],
                prodCommits: data[3],
                tag: null as any,
            }))
            .then(data => {
                let latestRCTag = null;
                for (let i = 0; i < data.tags.length; i++) {
                    if ((data.tags[i].name || '').includes('-rc')) {
                        if (!latestRCTag) {
                            latestRCTag = data.tags[i];
                        }
                    } else {
                        data.tag = data.tags[i];
                        break;
                    }
                }

                let merges = 0;
                const tmpArray = [];
                for (let i = 0; i < data.prodCommits.length; i++) {
                    const commit = data.prodCommits[i];
                    if (commit.id === data.tag.commit.id) {
                        break;
                    }
                    if (commit.title.startsWith('Merge')) {
                        merges++;
                        tmpArray.push(commit);
                    }
                }

                window.monar_GLOBALS.untaggedMerges = tmpArray;

                if ($('#monar-pipelines-global').length === 0) {
                    let badges = '';

                    if (latestRCTag) {
                        badges += `
                        <table style="display: inline-block; margin-bottom: 24px;">
                            <tr><td>
                            <a style="vertical-align: top; display: inline-block; margin-right: 40px;" href="${
                                window.monar_GLOBALS.project
                            }/commit/${latestRCTag.commit.id}">
                                <img src="https://img.shields.io/badge/latest rc-${latestRCTag.name.replace(
                                    /-/g,
                                    ' ',
                                )}-yellowgreen.svg" alt="${latestRCTag.name}" />
                            </a>
                            </td></tr>
                        </table>
                        `;
                    }

                    badges += `
                        <table style="display: inline-block">
                            <tr><td>
                            <a style="vertical-align: top; display: inline-block; margin-right: 40px;" href="${
                                window.monar_GLOBALS.project
                            }/commit/${data.tag.commit.id}">
                                <img src="https://img.shields.io/badge/latest tag-${data.tag.name.replace(
                                    /-/g,
                                    ' ',
                                )}-green.svg" alt="${data.tag.name}" />
                            </a>
                            </td></tr>
                            <tr><td>
                            <a style="vertical-align: top; display: inline-block; margin-right: 40px;" href="javascript:toggleUntaggedMerges()">
                                <img src="https://img.shields.io/badge/untagged merges-${merges}-green.svg" alt="merges" />
                            </a>
                            </td></tr>
                        </table>
                        `;

                    badges += '<table style="display: inline-block">';
                    (isFrontend() ? (['nightly', 'latest'] as const) : (['latest'] as const)).forEach(time => {
                        badges += `<tr><td style="text-align: right;"><img src="${getBadgeUrl(time, '')}" alt="${time}" /></td>`;
                        ['prod', 'qa', 'master'].forEach(branch => {
                            badges += `<td style="padding-left: 10px; text-align: center;">
                                <a href="${data[time][branch].web_url}">
                                    <img src="${getBadgeUrl(data[time][branch].status, branch)}" alt="${branch}" />
                                </a>
                            </td>`;
                        });
                        badges += '</tr>';
                    });
                    badges += '</table>';

                    $('nav.breadcrumbs .breadcrumbs-container').append(`
                        <div style="position: absolute; right: 0; top: -1px;" id="monar-pipelines-global">
                            ${badges}
                        </div>`);
                }
            });
    }
}

function fetchPipelineData(data: any) {
    return $.ajax({
        url: `/api/v4/projects/${window.monar_GLOBALS.projectId}/pipelines`,
        data: data,
    });
}

function getBadgeUrl(status: PipelineStatus, text: string) {
    const color = {
        running: 'blue',
        pending: 'blue',
        success: 'brightgreen',
        failed: 'red',
        canceled: 'lightgrey',
        skipped: 'lightgrey',
        nightly: 'orange',
        latest: 'orange',
        undefined: 'lightgrey',
    }[status];

    const statusWord = {
        running: 'running',
        pending: 'pending',
        success: 'passed',
        failed: 'failed',
        canceled: 'canceled',
        skipped: 'skipped',
        nightly: 'nightly',
        latest: 'latest',
        undefined: 'unknown',
    }[status];

    return `https://img.shields.io/badge/${text}-${statusWord}-${color}.svg`;
}

type PipelineStatus =
    | 'running'
    | 'pending'
    | 'success'
    | 'failed'
    | 'canceled'
    | 'skipped'
    | 'nightly'
    | 'latest'
    | 'undefined';
