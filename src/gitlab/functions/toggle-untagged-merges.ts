import { getJiraUrl } from './get-jira-url';
import { FADE_SPEED } from './CONSTS';

export function toggleUntaggedMerges(show: boolean) {
    if (arguments.length === 0) {
        show = $('#monar_untagged_merges_panel').is(':hidden') || $('#monar_untagged_merges_panel').length === 0;
    }

    if (show) {
        $('#content-body').fadeOut(FADE_SPEED);
        $('#monar_untagged_merges_panel').fadeIn(FADE_SPEED);

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
                const title = match ? match[1] : 'UNKNOWN';
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
        $('#content-body').fadeIn(FADE_SPEED);
        $('#monar_untagged_merges_panel').fadeOut(FADE_SPEED);
    }
}
