import { changelogNotes } from '../changelog-notes';
import { FADE_SPEED } from './CONSTS';

export namespace Changelog {
    const localStorageLastSeenVersionKey = 'MONAR_CHANGELOG_LAST_SEEN_ENTRY';

    export function createOpenChangelogButton() {
        if ($('#monar_open_changelog_button').length > 0) {
            return;
        }

        const openChangelogButton = $(`
                <button class="btn btn-md"  id="#monar_open_changelog_button">
                    Changelog
                </button>
            </div>`);

        const unseenChangelogVersions =
            changelogNotes.length - parseInt(localStorage.getItem(localStorageLastSeenVersionKey) || '0', 10);
        const unseenChangelogVersionBadge = $(`<span class="monar-notification-dot">${unseenChangelogVersions}</span>`);

        if (unseenChangelogVersions > 0) {
            $(openChangelogButton).append(unseenChangelogVersionBadge);
        }

        $(openChangelogButton).on('click', function () {
            $(this).removeClass('monar-notification-dot');
            localStorage.setItem(localStorageLastSeenVersionKey, `${changelogNotes.length}`);
            toggleChangelog();
        });

        $('.top-bar-container').append(openChangelogButton);
    }

    export function toggleChangelog() {
        const show = $('#monar_changelog_panel').is(':hidden') || $('#monar_changelog_panel').length === 0;

        if (show) {
            if ($('#monar_changelog_panel').length === 0) {
                const html = $(`
<div
    id="monar_changelog_panel"
    style="display:none; position: absolute; left: 0; right: 0; bottom: 0; top: 0; z-index: 9999; background: rgba(0,0,0,0.8); overflow-y:auto;"
>
    <div
        class="monar-background"
        style="width: 70%; padding:20px; margin: 20px auto 20px auto; position:relative;"
    >
        <a
            href="javascript:void(0)"
            id="monar_changelog_close_button"
            class="close-button"
        >
            &times;
        </a>
        <h1 style="text-align: center; font-size: 20px; margin:0;">
            Changelog
        </h1>
        <div
            id="monar_changelog_contents"
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
            }

            $('#monar_changelog_panel').fadeIn(FADE_SPEED);

            document.addEventListener(
                'keyup',
                event => {
                    if (event.key === 'Escape') {
                        $('#monar_changelog_panel').fadeOut(FADE_SPEED);
                    }
                },
                { once: true },
            );
        } else {
            $('#monar_changelog_panel').fadeOut(FADE_SPEED);
        }
    }
}
