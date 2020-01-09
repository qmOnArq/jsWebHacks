//@ts-nocheck
import { formatPullRequest } from './functions/format-pull-request';
import { getProjectId } from './functions/get-project-id';
import { CONSTS_CSS, CONSTS_STRINGS } from './functions/CONSTS';
import { loadSettings } from './functions/save-load-settings';
import { hidePrStuff } from './functions/hide-pr-stuff';
import { parseHtmlPullRequests } from './functions/parse-html-pull-requests';

function prettifyPullRequestPage() {
    if (!isPullRequestsListPage()) {
        return;
    }

    // Approvals
    $('.approvals-required-text.text-muted').remove();

    // Remove "You can merge this merge request manually using the  command line"
    $('.mr-section-container.mr-widget-workflow .mr-widget-footer').remove();

    // Remove text in pipeline info
    $('.mr-widget-heading.mr-widget-workflow .ci-widget-content').remove();

    // Redesign pipeline info
    $('.mr-state-widget.prepend-top-default').css('position', 'relative');
    const pipelineWrap = $('.ci-widget.media').closest('.mr-widget-heading.mr-widget-workflow');
    pipelineWrap.css({
        position: 'absolute',
        right: '70px',
        top: '-15px',
        border: 'none',
    });
    $('.ci-widget-container', pipelineWrap).insertBefore($('.align-self-start', pipelineWrap));
    $('.align-self-start', pipelineWrap).css({
        'margin-left': '15px',
        'margin-right': 0,
    });
    pipelineWrap.addClass('remove-before');

    // Cleanup first box
    $('.diverged-commits-count')
        .contents()
        .filter(function() {
            return this.nodeType == 3;
        })
        .remove();
    $('.diverged-commits-count').css('font-size', '10px');

    $('.git-merge-container .normal strong')
        .contents()
        .filter(function() {
            return (
                $(this)
                    .text()
                    .trim() === 'Request to merge'
            );
        })
        .remove();

    // Move "Check out branch"
    $('.js-check-out-branch').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-check-out-branch').removeClass('btn');
    $('.js-check-out-branch').wrap('<li></li>');

    // Move "Open in Web IDE"
    $('.js-web-ide').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-web-ide').removeClass('btn');
    $('.js-web-ide').wrap('<li></li>');
    $('.branch-actions ul.dropdown-menu').css('overflow', 'hidden');

    // Assign myself
    let assignButtonElement = $('#monar-assign-btn');
    if (assignButtonElement.length === 0) {
        const assignButton = `<a id="monar-assign-btn" href="#" style="position: absolute; right: 0; top: 20px; color: rgb(0, 82, 204);"></a>`;
        $('.breadcrumbs-list').after($(assignButton));
        assignButtonElement = $('#monar-assign-btn');
    }
    assignButtonElement.off('click');
    const assignedToYou = parseInt($('.block.assignee input[type=hidden]').val()) === window.monar_GLOBALS.id;
    assignButtonElement.html(assignedToYou ? 'Unassign me' : 'Assign me');
    assignButtonElement.click(function() {
        $.ajax({
            url: `/${window.gl.mrWidgetData.source_project_full_path}/merge_requests/${window.gl.mrWidgetData.iid}.json`,
            type: 'PUT',
            data: { merge_request: { assignee_id: assignedToYou ? '0' : window.monar_GLOBALS.id } },
            success: function(result) {
                location.reload();
            },
        });
    });

    // Deployed
    getUrlsForMR(window.gl.mrWidgetData.iid).then(urls => {
        urls.forEach(url => {});
    });

    // Emotes
    $('.emoji-list-container .awards')
        .css('opacity', 0.1)
        .css('border-bottom', 'none');
    $('.emoji-list-container .awards')
        .mouseenter(function() {
            $(this).css('opacity', 1);
        })
        .mouseleave(function() {
            $(this).css('opacity', 0.1);
        });

    // Feebas - main
    if (isFrontend()) {
        if ($('#monar-feebas-main').length === 0) {
            const href = `feebas://app:${window.gl.mrWidgetData.diff_head_sha}`;
            $('.mr-state-widget.prepend-top-default').append(
                `<a title="Open in Feebas" id="monar-feebas-main" href="${href}"></a>`,
            );
            $('#monar-feebas-main').css(CONSTS_CSS('feebas'));
            $('#monar-feebas-main').css({ position: 'absolute', right: '0px', top: '-45px' });
            $('#monar-feebas-main')
                .mouseenter(function() {
                    $(this).css('background-color', '#1aaa55');
                })
                .mouseleave(function() {
                    $(this).css('background-color', 'transparent');
                });
        }

        // Feebas - commits
        const feebasInterval = setInterval(function() {
            if ($('#commits-list').length !== 0) {
                clearInterval(feebasInterval);

                $('#commits-list li .commit-actions').each(function() {
                    const element = $(this);
                    const commitId = $('[data-title="Copy commit SHA to clipboard"]', element).data('clipboard-text');
                    const id = `monar-feebas-${commitId}`;
                    const href = `feebas://app:${commitId}`;
                    element.append(`<a title="Open in Feebas" id="${id}" href="${href}"></a>`);
                    $('#' + id).css(CONSTS_CSS('feebas'));
                    $('#' + id).css('margin-left', '15px');

                    $('#' + id)
                        .mouseenter(function() {
                            $(this).css('background-color', '#1aaa55');
                        })
                        .mouseleave(function() {
                            $(this).css('background-color', 'transparent');
                        });
                });
            }
        }, 500);
    }

    // Approve button
    function createApproveButton() {
        const $buttonsRow = $('.detail-page-header-actions.js-issuable-actions .issue-btn-group');
        const $button = $('[data-qa-selector="approve_button"]').clone(true, true);
        $buttonsRow.prepend($button);
        $button.css({float: 'left'});
        $button.removeClass('btn-sm');
        $button.attr('data-qa-selector', '-');
        $button.on('click', function(){
            $('[data-qa-selector="approve_button"]').trigger('click');
            $(this).off('click');
            $(this).addClass('disabled');
            setTimeout(() => {
                $(this).remove();
                createApproveButton();
            }, 1000);
        });
    }
    createApproveButton();


    // Remove errors
    setInterval(function() {
        $('.err').removeClass('err');
    }, 500);
}

function prettifyCommitList() {
    // Feebas - main
    if (isFrontend()) {
        if ($('#commits-list').length !== 0) {
            const feebasInterval = setInterval(function() {
                clearInterval(feebasInterval);

                $('#commits-list li .commit-actions').each(function() {
                    const element = $(this);
                    const commitId = $('[data-title="Copy commit SHA to clipboard"]', element).data('clipboard-text');
                    const id = `monar-feebas-${commitId}`;
                    const href = `feebas://app:${commitId}`;
                    element.append(`<a title="Open in Feebas" id="${id}" href="${href}"></a>`);
                    $('#' + id).css(CONSTS_CSS('feebas'));
                    $('#' + id).css('margin-left', '15px');

                    $('#' + id)
                        .mouseenter(function() {
                            $(this).css('background-color', '#1aaa55');
                        })
                        .mouseleave(function() {
                            $(this).css('background-color', 'transparent');
                        });
                });
            }, 500);
        }
    }
}

function prettifyCreatePullRequestPage() {
    const titleElement = document.querySelector('.form-control.qa-issuable-form-title');
    if (titleElement) {
        const titleRegex = /Resolve (.*?) \"(.*?)\"/g;
        const titleRegexMatch = titleRegex.exec(titleElement.value);
        if (titleRegexMatch && titleRegexMatch.length === 3) {
            titleElement.value = `${titleRegexMatch[1]} ${titleRegexMatch[2]}`;
        }
    }
}

function addBadges() {
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
            .then(data => ({ latest: data[0], nightly: data[1], tags: data[2], prodCommits: data[3] }))
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
                                )}-yellowgreen.svg"></img>
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
                                )}-green.svg"></img>
                            </a>
                            </td></tr>
                            <tr><td>
                            <a style="vertical-align: top; display: inline-block; margin-right: 40px;" href="javascript:toggleUntaggedMerges()">
                                <img src="https://img.shields.io/badge/untagged merges-${merges}-green.svg"></img>
                            </a>
                            </td></tr>
                        </table>
                        `;

                    badges += '<table style="display: inline-block">';
                    (isFrontend() ? ['nightly', 'latest'] : ['latest']).forEach(function(time) {
                        badges += `<tr><td style="text-align: right;"><img src="${getBadgeUrl(time, '')}"></img></td>`;
                        ['prod', 'qa', 'master'].forEach(function(branch) {
                            badges += `<td style="padding-left: 10px; text-align: center;">
                                <a href="${data[time][branch].web_url}">
                                    <img src="${getBadgeUrl(data[time][branch].status, branch)}"></img>
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

    function fetchPipelineData(data) {
        return $.ajax({
            url: `/api/v4/projects/${window.monar_GLOBALS.projectId}/pipelines`,
            data: data,
        });
    }

    function getBadgeUrl(status, text) {
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
}

function isFrontend() {
    return window.monar_GLOBALS.project === '/app/frontend';
}

function isPullRequestsListPage() {
    return $('div.merge-request').length === 1;
}

function isPullRequestViewPage() {
    return $('#content-body .merge-request .merge-request-details').length === 1;
}

function getJiraUrl() {
    return $('.shortcuts-external_tracker').attr('href') || '';
}

function toggleUntaggedMerges(show: boolean) {
    if (arguments.length === 0) {
        show = $('#monar_untagged_merges_panel').is(':hidden') || $('#monar_untagged_merges_panel').length === 0;
    }

    if (show) {
        $('#content-body').hide();
        $('#monar_untagged_merges_panel').show();

        if ($('#monar_untagged_merges_panel').length === 0) {
            const merges = window.monar_GLOBALS.untaggedMerges || [];
            const jira = getJiraUrl();
            let html = '<div id="monar_untagged_merges_panel" style="padding: 20px">';
            html += `<h3 style="padding-bottom: 20px">Untagged merges (${merges.length})`;
            html +=
                '<a href="javascript:toggleUntaggedMerges(false)" style="margin-left: 16px; font-size: 14px;">(close)</a>';
            html += '</h3>';
            html += '<table style="width: 100%">';
            merges.forEach(commit => {
                let match = commit.title.match(/'([\S]*)'/);
                match = match || commit.message.match(/'([\S]*)'/);
                const title = match ? match[1] : 'UNKOWN';
                match = title.match(/^([^ -]*-\d*)/);
                const jiraTicket = match ? match[1] : '';

                const date = new Date(commit.created_at);

                html += '<tr>';
                html += `<td><a href="${jira}/browse/${jiraTicket}">${jiraTicket}</a></td>`;
                html += `<td><a href="${window.monar_GLOBALS.project}/commit/${commit.id}">${title}</a></td>`;
                html += `<td>${commit.short_id}</td>`;
                html += `<td>${commit.author_name}</td>`;
                html += `<td>${date.toDateString()}</td>`;
                html += `<td>${date.toLocaleTimeString()}</td>`;
                html += '</tr>';
            });
            html += '</table>';
            html += '</div>';
            $('#content-body')
                .parent()
                .append(html);
        }
    } else {
        $('#content-body').show();
        $('#monar_untagged_merges_panel').hide();
    }
}

function getUrlsForMR(mergeRequestId) {
    const projectId = getProjectId();
    const urls = [];

    return $.ajax(`/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/pipelines`)
        .then(pipelines => pipelines.filter(pipeline => pipeline.status === 'success'))
        .then(pipelines => {
            const promises: Promise<any>[] = [];

            pipelines.forEach(pipeline => {
                const p = $.ajax(`/api/v4/projects/${projectId}/pipelines/${pipeline.id}/jobs`)
                    .then(jobs => jobs.filter(job => job.name.match(/new domain/g)))
                    .then(jobs => {
                        const promises2: Promise<any>[] = [];

                        jobs.forEach(job => {
                            const p2 = $.ajax(`/api/v4/projects/${projectId}/jobs/${job.id}/trace`).then(data => {
                                const match = data.match(/Go to (https:\/\/[^$]\S*)/m);
                                if (match[1]) {
                                    urls.push(match[1]);
                                }
                            });
                            promises2.push(p2);
                        });
                        return Promise.all(promises2);
                    });
                promises.push(p);
            });
            return Promise.all(promises);
        })
        .then(() => urls);
}

function colorMergeRequestNumbers() {
    $('.merge_counter, #state-opened .badge').each(function() {
        const MRs = parseInt($(this).text(), 10);
        const color =
            MRs < window.monar_GLOBALS.MR_LIMITS.warning
                ? 'green'
                : MRs < window.monar_GLOBALS.MR_LIMITS.danger
                ? 'orange'
                : 'red';
        $(this).css('background-color', CONSTS_STRINGS(color));
        $(this).css('color', 'white');
        if (MRs >= window.monar_GLOBALS.MR_LIMITS.blink) {
            $(this).css('animation', 'monar_background_blink .75s ease-in-out infinite alternate');
        }
    });
}

window['toggleUntaggedMerges'] = toggleUntaggedMerges;
window['hidePrStuff'] = hidePrStuff;

let startFails = 0;

function start() {
    if (!window.gon || !window.gl || !window.gl.projectOptions) {
        startFails++;
        if (startFails < 5) {
            setTimeout(() => start(), 50);
        }
        return;
    }

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
        if ($('#monar-styles').length === 0) {
            const css = `<style id="monar-styles">
                .remove-before::before{display: none !important;} .remove-after::after{display: none !important;}

                @keyframes monar_background_blink {
                    100% {
                    background-color: rgba(0,0,0,0);

                    }
                }
            </style>`;

            document.head.insertAdjacentHTML('beforeEnd', css);
        }

        parseHtmlPullRequests().forEach(formatPullRequest);
        prettifyPullRequestPage();
        prettifyCommitList();
        prettifyCreatePullRequestPage();
        addBadges();
        colorMergeRequestNumbers();
    }
}

start();
