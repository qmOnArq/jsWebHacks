import { changelogNotes } from '../changelog-notes';
import { FADE_SPEED } from './CONSTS';

export namespace Changelog {
    const localStorageLastSeenVersionKey = 'MONAR_CHANGELOG_LAST_SEEN_ENTRY';

    export function createOpenChangelogButton() {
        if ($('#monar_open_changelog_button').length > 0) {
            return;
        }

        const openChangelogButton = $(`
            <div id="#monar_open_changelog_button" style="position: absolute; left: 50%; transform: translateX(-50%); z-index: 1;">
                <ul class="navbar-sub-nav list-unstyled">
                    <li>
                        <button class="btn">
                            Changelog
                        </button>
                    </li>
                </ul>
            </div>
        `);

        const unseenChangelogVersions =
            changelogNotes.length - parseInt(localStorage.getItem(localStorageLastSeenVersionKey) || '0', 10);
        const unseenChangelogVersionBadge = $(`<span class="monar-notification-dot">${unseenChangelogVersions}</span>`);

        if (unseenChangelogVersions > 0) {
            $(openChangelogButton).append(unseenChangelogVersionBadge);
        }

        $('button', openChangelogButton).on('click', function () {
            $(this).removeClass('monar-notification-dot');
            localStorage.setItem(localStorageLastSeenVersionKey, `${changelogNotes.length}`);
            toggleChangelog();
        });

        $('header.navbar').prepend(openChangelogButton);
    }

    export function toggleChangelog() {
        const show = $('#monar_changelog_panel').is(':hidden') || $('#monar_changelog_panel').length === 0;

        if (show) {
            if ($('#monar_changelog_panel').length === 0) {
                const html = $(`
<div
    id="monar_changelog_panel"
    style="display: none; position: fixed; left: 0; right: 0; bottom: 0; top: 48px; z-index: 9999; background: rgba(0,0,0,0.8)"
>
    <div
        class="monar-background"
        style="left: 50%; top: 40px; width: 70%; bottom: 40px; transform: translateX(-50%); border-radius: 4px; position: absolute; overflow: hidden;"
    >
        <a
            href="javascript:void(0)"
            id="monar_changelog_close_button"
            class="close-button"
        >
            &times;
        </a>
        <h1 style="text-align: center; font-size: 20px; margin-top: 8px; margin-bottom: -12px;">
            Changelog
        </h1>
        <div
            id="monar_changelog_contents"
            style="padding: 0 20px 20px 20px; overflow: auto; height: calc(100% - 20px);"
        >
        </div>
                `);

                $('body').append(html);
                $('#monar_changelog_close_button').on('click', function () {
                    toggleChangelog();
                });
                changelogNotes.forEach(note => {
                    $('#monar_changelog_contents').append(`
                        <hr>
                        <div style="display:flex">
                            <div style="width:10%; vertical-align: top; margin-right: 20px; font-weight: bold; color: #de7e00;">${note.date}</div>
                            <div style="width:90%; vertical-align: top;">${note.text}</div>
                        </div>
                    `);
                });

                const css = `
                    <style id="monar-styles-changelog">
                        #monar_changelog_contents h1 {
                            margin-top: 0;
                            font-size: 20px;
                            margin-bottom: 8px;
                        }

                        #monar_changelog_contents p {
                            margin-bottom: 8px;
                        }
                    </style>`;

                document.head.insertAdjacentHTML('beforeend', css);
            }

            $('#monar_changelog_panel').fadeIn(FADE_SPEED);
        } else {
            $('#monar_changelog_panel').fadeOut(FADE_SPEED);
        }
    }
}
