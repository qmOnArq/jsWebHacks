import { parseHtmlPullRequests } from './parse-html-pull-requests';

export function hidePrStuff() {
    parseHtmlPullRequests().forEach(request => {
        const title = request.title;

        const isWip = title.includes('WIP');
        let hidden = false;

        if (isWip && window.monar_SETTINGS?.hideWip) {
            hidden = true;
        }

        request.element.children().css('opacity', hidden ? 0.2 : 1);
    });
}
