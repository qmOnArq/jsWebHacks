function CONSTS(type) {
    return {
        feebas: {
            'background-image': 'url("https://github.com/timzatko/feebas/blob/master/packages/desktop_app/src/favicon.256x256.png?raw=true")',
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'background-origin': 'content-box',
            'padding': '4px',
            width: '40px',
            height: '40px',
            'border-radius': '50%',
            border: '1px solid #1aaa55',
            'box-sizing': 'border-box',
            'background-color': 'transparent',
        },

        prod: {
            'background-color': 'red',
            color: 'white',
            'border-radius': '3px',
            display: 'inline-block',
            padding: '0 4px 0 2px',
        },

        qa: {
            'background-color': 'yellow',
            color: 'black',
            'border-radius': '3px',
            display: 'inline-block',
            padding: '0 4px 0 2px',
        },

        upvoteIcon: {
            color: 'green',
            position: 'absolute',
            right: '280px',
            top: '11px',
            'margin-right': '0',
        },

        downvoteIcon: {
            color: 'red',
            position: 'absolute',
            right: '330px',
            top: '11px',
            'margin-right': '0',
        },

        conflictIcon: {
            color: 'red',
            position: 'absolute',
            right: '40px',
            top: '13px',
        },

        authorPhoto: {
            'margin-top': '10px',
            display: 'block',
            width: '24px',
            height: '24px',
            'background-color': 'gray',
            'background-size': 'contain',
            'border-radius': '50%',
            'margin-right': '15px',
            overflow: 'hidden',
        },

        authorPhotoHTML: '<div class="monar-author-photo"><div style="width: 100%; height: 100%; background-size: contain;"></div></div>',

        reviewerPhoto: {
            width: '24px',
            height: '24px',
        },

        reviewerWrapper: {
            position: 'absolute',
            right: '70px',
            top: '8px',
        },

        pipelineWrapper: {
            position: 'absolute',
            right: '15px',
            'margin-right': 0,
            top: '12px',
        },

        commentsWrapper: {
            position: 'absolute',
            right: '200px',
            top: '11px',
        },

        updatedAtWrapper: {
            position: 'absolute',
            opacity: '0.5',
            right: '15px',
            bottom: '8px',
        },

        titleBase: {
            color: 'rgb(0, 82, 204)',
            'font-weight': 'normal',
        },

        statusWrapper: {
            position: 'absolute',
            right: '100px',
            top: '11px',
        },

        approvedBg: {
            'background-color': 'rgba(105, 209, 0, 0.05)',
        },
    }[type];
}

function parseHtmlPullRequests() {
    const pullRequests = [];

    $('li.merge-request').each(function() {
        const element = $(this);

        const titleElement = $('.merge-request-title-text a', element);
        const idElement = $('.issuable-reference', element);
        const authorElement = $('.issuable-info .author-link', element);
        const targetElement = $('.project-ref-path .ref-name', element);
        const conflictElement = $('.issuable-pipeline-broken a', element);
        const upvoteElement = $('.issuable-upvotes', element);
        const downvoteElement = $('.issuable-downvotes', element);
        const commentsElement = $('.issuable-comments', element);
        const approveElement = $('.issuable-info .badge:contains("approved")', element);
        const reviewerElement = $('.issuable-meta .author-link', element);
        const pipelineElement = $('.issuable-pipeline-status', element);
        const updatedAtElement = $('.issuable-updated-at', element);
        const statusElement = $('.issuable-status', element);

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

            targetElement,
            target: targetElement.text().trim(),

            conflictElement,
            hasConflict: conflictElement[0],

            upvoteElement,
            upvoteCount: upvoteElement.text().trim(),
            isUpvoted: upvoteElement.text().trim() > 0,

            downvoteElement,

            commentsElement,
            commentsCount: commentsElement.text().trim(),

            approveElement,
            isApproved: approveElement[0],

            statusElement,
            status: statusElement.text().trim(),

            reviewerElement,
            pipelineElement,
            updatedAtElement,
        });
    });

    return pullRequests;
}

function formatPullRequest(request) {
    const projectId = $('#search_project_id')[0] ? $('#search_project_id')[0].value : null;

    // Target
    if (request.target === 'prod') {
        request.targetElement.css(CONSTS('prod'));
    } else if (request.target === 'qa') {
        request.targetElement.css(CONSTS('qa'));
    }

    // Author photo
    let authorPhoto = $('.monar-author-photo', request.element);
    if (!authorPhoto[0]) {
        $('.issuable-info-container', request.element).prepend(CONSTS('authorPhotoHTML'));
        authorPhoto = $('.monar-author-photo', request.element);
    }
    authorPhoto.css(CONSTS('authorPhoto'));
    authorPhoto.css('background-image', `url(${window['monar_GLOBALS'].defaultAvatar})`);
    $('div', authorPhoto).css('background-image', `url('/uploads/-/system/user/avatar/${request.author.id}/avatar.png?width=44')`);

    // Title modifications
    request.titleElement.css(CONSTS('titleBase'));
    let title = request.title;
    title = title.replace(/^Resolve/g, '');
    title = title.replace(/(APP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(APPT-\d*)/g, '<b>$1</b>');
    title = title.replace(/(CMP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(DB-\d*)/g, '<b>$1</b>');
    title = title.replace(/(FIX)/g, '<b>$1</b>');
    title = title.replace(/(QA-\d*)/g, '<b>$1</b>');
    title = title.replace(/(SEC-\d*)/g, '<b>$1</b>');
    title = title.replace(/(DP-\d*)/g, '<b>$1</b>');
    title = title.replace(/(PRED-\d*)/g, '<b>$1</b>');
    title = title.replace(/(FRON-\d*)/g, '<b>$1</b>');
    title = title.replace(/(WE-\d*)/g, '<b>$1</b>');
    title = title.replace(/(ANL-\d*)/g, '<b>$1</b>');
    title = title.replace(/\[([^\]]+)\]/ig, '<b style="background-color: rgba(0,255,255,0.5); color: black;">[$1]</b>');
    title = title.replace(/WIP(:?)/g, '<b style="color: red;">WIP$1</b>');
    request.titleElement.html(title);

    // Upvoted
    if (request.isUpvoted) {
        request.upvoteElement.css(CONSTS('upvoteIcon'));
    }
    if (request.downvoteElement[0]) {
        request.downvoteElement.css(CONSTS('downvoteIcon'));
    }

    // Conflict
    if (request.hasConflict) {
        request.conflictElement.css(CONSTS('conflictIcon'));
    }

    // Approved
    if (request.isApproved) {
        request.element.css(CONSTS('approvedBg'));
    }

    // Reviewer
    if (request.reviewerElement[0]) {
        $('img', request.reviewerElement).css(CONSTS('reviewerPhoto'));
        request.reviewerElement.css(CONSTS('reviewerWrapper'));
    }

    // Pipeline
    if (request.pipelineElement[0]) {
        request.pipelineElement.css(CONSTS('pipelineWrapper'));
    }

    // Comments
    if (request.commentsCount < 1) {
        request.commentsElement.remove();
    } else {
        request.commentsElement.css(CONSTS('commentsWrapper'));
    }

    // Updated at
    if (request.updatedAtElement[0]) {
        request.updatedAtElement.css(CONSTS('updatedAtWrapper'));
    }

    // Status (merged / closed)
    if (request.statusElement[0]) {
        request.statusElement.css('color', request.status === 'MERGED' ? 'green' : 'red');
        request.statusElement.css(CONSTS('statusWrapper'));
    }

    // Line

    if (projectId !== null) {
        // Unresolved discussions
        let unresolved = 0;
        $.ajax(`/api/v4/projects/${projectId}/merge_requests/${request.id}/discussions`)
            .then(function(data) {
                (data || []).forEach(function (item) {
                    if (item.notes && item.notes[0]) {
                        const note = item.notes[0];
                        if (note.resolvable && !note.resolved) {
                            unresolved++;
                        }
                    }
                });

                if (unresolved > 0) {
                    $('a', request.commentsElement).prepend(`<span style="color: red;"><i aria-hidden="true" data-hidden="true" class="fa fa-crosshairs"></i><span>${unresolved}</span></span>&nbsp;&nbsp;&nbsp;`);
                }
            })
            .catch(function(x) {
                console.log(x.responseJSON);
            });


        // Approvals
        $.ajax(`/api/v4/projects/${projectId}/merge_requests/${request.id}/approvals`)
            .then(function(data) {

                (data.approved_by || []).forEach(function(item, index) {
                    item = item.user;
                    // Author photo
                    const className = `monar-approve-photo-${item.id}`;

                    const html = `<div class="${className}"><div style="width: 100%; height: 100%; background-size: contain;"></div></div>`;
                    const css = {
                        display: 'block',
                        width: '24px',
                        height: '24px',
                        'background-color': 'gray',
                        'background-size': 'contain',
                        'border-radius': '50%',
                        overflow: 'hidden',
                        border: '2px solid #69D100',
                        position: 'absolute',
                        top: '34px',
                        right: (index * 30) + 215 + 'px',
                    };

                    let approvePhoto = $('.' + className, request.element);
                    if (!approvePhoto[0]) {
                        $('.issuable-info-container', request.element).prepend(html);
                        approvePhoto = $('.' + className, request.element);
                    }
                    approvePhoto.css(css);
                    approvePhoto.css('background-image', `url(${window['monar_GLOBALS'].defaultAvatar})`);
                    $('div', approvePhoto).css('background-image', `url('${item.avatar_url}?width=44')`);
                    $('div', approvePhoto).attr('title', item.name);
                    request.element.css(CONSTS('approvedBg'));
                });

                // {
                //     avatar_url: "https://gitlab.exponea.com/uploads/-/system/user/avatar/__/avatar.png"
                //     id: __
                //     name: "__"
                //     state: "active"
                //     username: "__"
                //     web_url: "https://gitlab.exponea.com/__"
                // }
            })
            .catch(function(x) {
                console.log(x.responseJSON);
            });
    }
}

function prettifyPullRequestPage() {
    if ($('div.merge-request').length !== 1) {
        return;
    }

    if ($('#monar-styles').length === 0) {
        const css = `<style id="monar-styles">.remove-before::before{display: none !important;} .remove-after::after{display: none !important;}</style>`;
        document.head.insertAdjacentHTML('beforeEnd', css);
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
    $('.diverged-commits-count').contents().filter(function() {
        return (this.nodeType == 3);
    }).remove();
    $('.diverged-commits-count').css('font-size', '10px');

    $('.git-merge-container .normal strong').contents().filter(function() {
        return $(this).text().trim() === 'Request to merge';
    }).remove();

    // Move "Check out branch"
    $('.js-check-out-branch').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-check-out-branch').removeClass('btn');
    $('.js-check-out-branch').wrap('<li></li>');

    // Move "Open in Web IDE"
    $('.js-web-ide').insertAfter($('.branch-actions ul.dropdown-menu li:last-child'));
    $('.js-web-ide').removeClass('btn');
    $('.js-web-ide').wrap('<li></li>');
    $('.branch-actions ul.dropdown-menu').css('overflow', 'hidden');

    // Approve button
    // let approveButtonElement = $('#monar-approve-btn');
    // if (approveButtonElement.length === 0) {
    //     const approveButton = `<button id="monar-approve-btn" type="button" class="btn float-left prepend-left-10"></button>`;
    //     $('.issuable-close-dropdown').after($(approveButton));
    //     approveButtonElement = $('#monar-approve-btn');
    // }
    // approveButtonElement.off('click');
    // let labels = [];
    // $('.block.labels input[type=hidden]').each(function() {
    //     labels.push(parseInt($(this).val()));
    // });
    // const approved = labels.includes(window['monar_GLOBALS'].APPROVE_ID);
    // approveButtonElement.html(approved ? 'Unapprove' : 'Approve');
    // approveButtonElement.addClass(approved ? 'btn-danger' : 'btn-success');
    // approveButtonElement.click(function() {
    //     if (!approved) {
    //         labels.push(window['monar_GLOBALS'].APPROVE_ID);
    //     } else {
    //         labels = labels.filter(function(item) {
    //             return item !== window['monar_GLOBALS'].APPROVE_ID;
    //         });
    //     }
    //     $.ajax({
    //         url: `/${window.gl.mrWidgetData.source_project_full_path}/merge_requests/${window.gl.mrWidgetData.iid}.json`,
    //         type: 'PUT',
    //         data: { merge_request: { label_ids: labels } },
    //         success: function(result) {
    //             location.reload();
    //         },
    //     });
    // });

    // Assign myself
    let assignButtonElement = $('#monar-assign-btn');
    if (assignButtonElement.length === 0) {
        const assignButton = `<a id="monar-assign-btn" href="#" style="position: absolute; right: 0; top: 20px; color: rgb(0, 82, 204);"></a>`;
        $('.breadcrumbs-list').after($(assignButton));
        assignButtonElement = $('#monar-assign-btn');
    }
    assignButtonElement.off('click');
    const assignedToYou = parseInt($('.block.assignee input[type=hidden]').val()) === window['monar_GLOBALS'].id;
    assignButtonElement.html(assignedToYou ? 'Unassign me' : 'Assign me');
    assignButtonElement.click(function() {
        $.ajax({
            url: `/${window.gl.mrWidgetData.source_project_full_path}/merge_requests/${window.gl.mrWidgetData.iid}.json`,
            type: 'PUT',
            data: { merge_request: { assignee_id: assignedToYou ? '0' : window['monar_GLOBALS'].id } },
            success: function(result) {
                location.reload();
            },
        });
    });

    // Emotes
    $('.emoji-list-container').css('opacity', 0.1).css('border-bottom', 'none');
    $('.emoji-list-container').mouseenter(function() {
        $(this).css('opacity', 1);
    }).mouseleave(function() {
        $(this).css('opacity', 0.1);
    });

    // Feebas - main
    if (window.monar_GLOBALS.project === '/app/frontend') {
        if ($('#monar-feebas-main').length === 0) {
            const href = `feebas://app:${window.gl.mrWidgetData.diff_head_sha}`;
            $('.mr-state-widget.prepend-top-default').append(`<a title="Open in Feebas" id="monar-feebas-main" href="${href}"></a>`);
            $('#monar-feebas-main').css(CONSTS('feebas'));
            $('#monar-feebas-main').css({ position: 'absolute', right: '0px', top: '-45px' });
            $('#monar-feebas-main').mouseenter(function() {
                $(this).css('background-color', '#1aaa55');
            }).mouseleave(function() {
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
                    $('#' + id).css(CONSTS('feebas'));
                    $('#' + id).css('margin-left', '15px');

                    $('#' + id).mouseenter(function() {
                        $(this).css('background-color', '#1aaa55');
                    }).mouseleave(function() {
                        $(this).css('background-color', 'transparent');
                    });
                });
            }
        }, 500);
    }

    // Remove errors
    setInterval(function() {
        $('.err').removeClass('err');
    }, 500);
}

function prettifyCommitList() {
    // Feebas - main
    if (window.monar_GLOBALS.project === '/app/frontend') {
        if ($('#commits-list').length !== 0) {
            const feebasInterval = setInterval(function() {
                clearInterval(feebasInterval);

                $('#commits-list li .commit-actions').each(function() {
                    const element = $(this);
                    const commitId = $('[data-title="Copy commit SHA to clipboard"]', element).data('clipboard-text');
                    const id = `monar-feebas-${commitId}`;
                    const href = `feebas://app:${commitId}`;
                    element.append(`<a title="Open in Feebas" id="${id}" href="${href}"></a>`);
                    $('#' + id).css(CONSTS('feebas'));
                    $('#' + id).css('margin-left', '15px');

                    $('#' + id).mouseenter(function() {
                        $(this).css('background-color', '#1aaa55');
                    }).mouseleave(function() {
                        $(this).css('background-color', 'transparent');
                    });
                });
            }, 500);
        }
    }
}

setTimeout(function() {
    window['monar_GLOBALS'] = {
        id: gon.current_user_id,
        username: gon.current_username,
        name: gon.current_user_fullname,
        avatar: gon.current_user_avatar_url,
        defaultAvatar: gon.default_avatar_url,

        project: window.gl.projectOptions[Object.keys(window.gl.projectOptions)[0]].issuesPath.replace('/issues', ''),

        APPROVE_ID: 0,
    };

    parseHtmlPullRequests().forEach(formatPullRequest);

    $.ajax({
        url: `${window['monar_GLOBALS'].project}/labels.json`,
        success: function(result) {
            (result || []).forEach(function(item) {
                if (((item || {}).title || '').trim() === 'approved') {
                    window['monar_GLOBALS'].APPROVE_ID = (item || {}).id;
                }
            });

            prettifyPullRequestPage();
        },
    });

    prettifyCommitList();

    const titleElement = document.querySelector('.form-control.qa-issuable-form-title');
    const titleRegex = /Resolve (.*?) \"(.*?)\"/g;
    const titleRegexMatch = titleRegex.exec(titleElement.value);
    if (titleRegexMatch && titleRegexMatch.length === 3) {
        titleElement.value = `${titleRegexMatch[1]} ${titleRegexMatch[2]}`;
    }
}, 0);