export function parseHtmlPullRequests(forceAll = false) {
    const pullRequests: any[] = [];

    $('li.merge-request').each(function () {
        const element = $(this);
        if (element.hasClass('monar-parsed') && !forceAll) {
            return;
        }

        element.addClass('monar-parsed');

        const titleElement = $('[data-testid="issuable-title"] a', element);
        const idElement = $('.issuable-reference', element);
        const authorElement = $('.issuable-info .author-link', element);
        const targetElement = $('.project-ref-path .ref-name', element);
        const conflictElement = $('[data-testid="merge-request-cannot-merge"]', element);
        const upvoteElement = $('.issuable-upvotes', element);
        const downvoteElement = $('.issuable-downvotes', element);
        const commentsElement = $('[data-testid="issuable-comments"]', element);
        const approveElement = $('.issuable-meta .badge:icontains("Approved")', element);
        const systemElement = $('.issuable-info .badge:icontains("system")', element);
        const assigneeElement = $('.issuable-meta .author-link:not(.issuable-reviewers .author-link)', element);
        const reviewerElement = $('.issuable-meta .issuable-reviewers .author-link', element);
        const pipelineElement = $('.issuable-pipeline-status', element);
        const updatedAtElement = $('[data-testid="issuable-timestamp"]', element);
        const statusElement = $('.issuable-status', element);
        const bottomTextElement = $('.issuable-authored', element);
        const tasksElement = $('.task-status', element);
        const tagsElement = $('[aria-label="Labels"]', element);

        if (!titleElement.data('monar-title')) {
            titleElement.data('monar-title', titleElement.text().trim());
        }

        console.log(titleElement.data('monar-title'), approveElement);

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

    return pullRequests;
}
