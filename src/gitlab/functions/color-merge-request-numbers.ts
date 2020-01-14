import { CONSTS_STRINGS } from './CONSTS';

export function colorMergeRequestNumbers() {
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
