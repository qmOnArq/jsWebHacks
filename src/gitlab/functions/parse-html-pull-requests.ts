import { isFrontend } from "./is-frontend";

export function parseHtmlPullRequests() {
    const pullRequests: any[] = [];

    $('li.merge-request').each(function () {
        const element = $(this);

        const titleElement = $('.merge-request-title-text a', element);
        const idElement = $('.issuable-reference', element);
        const authorElement = $('.issuable-info .author-link', element);
        const targetElement = $('.project-ref-path .ref-name', element);
        const conflictElement = $('.issuable-pipeline-broken a', element);
        const upvoteElement = $('.issuable-upvotes', element);
        const downvoteElement = $('.issuable-downvotes', element);
        const commentsElement = $('[data-testid="issuable-comments"]', element);
        const approveElement = $('.issuable-info .badge:contains("approved")', element);
        const systemElement = $('.issuable-info .badge:contains("system")', element);
        const assigneeElement = $('.issuable-meta .author-link:not(.issuable-reviewers .author-link)', element);
        const reviewerElement = $('.issuable-meta .issuable-reviewers .author-link', element);
        const pipelineElement = $('.issuable-pipeline-status', element);
        const updatedAtElement = $('.issuable-updated-at', element);
        const statusElement = $('.issuable-status', element);
        const bottomTextElement = $('.issuable-authored', element);
        const tasksElement = $('.task-status', element);
        const tagsElement = $('[aria-label="Labels"]', element);

        if (!titleElement.data('monar-title')) {
            titleElement.data('monar-title', titleElement.text().trim());
        }

        pullRequests.push({
            element,

            titleElement,
            title: titleElement.data('monar-title'),

            idElement,
            id: idElement.text().trim().substring(1),

            authorElement,
            author: {
                username: authorElement.data('username').trim(),
                name: authorElement.data('name').trim(),
                id: authorElement.data('userId'),
            },

            bottomTextElement,

            targetElement,
            target: targetElement.text().trim(),

            conflictElement,
            hasConflict: conflictElement[0],

            upvoteElement,
            upvoteCount: upvoteElement.text().trim(),
            isUpvoted: parseInt(upvoteElement.text().trim(), 10) > 0,

            downvoteElement,

            commentsElement,
            commentsCount: commentsElement.text().trim(),

            approveElement,
            isApproved: approveElement[0],
            isSystem: systemElement[0],

            statusElement,
            status: statusElement.text().trim(),

            assigneeElement,
            reviewerElement,
            pipelineElement,
            updatedAtElement,

            tasksElement,
            tagsElement,
        });
    });

    if (pullRequests.length > 0) {
        test();
    }

    return pullRequests;
}

let done = false;
function test() {
    if (done) {
        return;
    }

    const date = new Date();
    if (date.getMonth() === 3 && date.getDate() === 1 && isFrontend()) {
        if (localStorage.getItem('no_geese_allowed') == null) {
            console.log('Here comes the goose (no_geese_allowed)');
            done = true;
            require('../test.min.js');
        }
    }
}
