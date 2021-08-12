import dashify from '../helpers/dashify';
import copyText from '../helpers/copy-text-to-clipboard.function';

export default function addBranchLinks() {
    // Get target element
    const callToActionsElement = document.querySelector('.call-to-actions');
    if (!callToActionsElement || callToActionsElement.querySelector('.create-branch-link')) {
        return;
    }

    // Get branch name
    const issueNameElement: HTMLElement | null = document.querySelector('#summary-val');
    const issueKeyElement: HTMLMetaElement | null = document.querySelector('meta[name="ajs-issue-key"]');

    if (issueNameElement === null || issueKeyElement === null) {
        return;
    }

    const issueName = issueNameElement.innerText;
    const issueKey = issueKeyElement.content;
    const newBranchName = `${issueKey}-${dashify(issueName, { replaceApostrophe: true, condense: true })}`;

    const createLink = (element: { text: string; id?: string; href?: string }, onClick?: Function) => {
        callToActionsElement.insertAdjacentHTML(
            'beforeend',
            `<br />
                <a
                    ${element.id ? `id="${element.id}"` : ''}
                    ${element.href ? `href="${element.href}"` : ''}
                    ${element.href ? `target="_blank"` : ''}
                >
                    <span class="devstatus-cta-link-text">${element.text}</span>
                </a>
        `,
        );

        if (element.id && element.id !== '' && onClick) {
            document.getElementById(element.id)!.addEventListener('click', () => onClick());
        }
    };

    // Copy branch name
    createLink(
        {
            id: 'copy-branch-name',
            text: 'Copy branch name',
        },
        () => copyText(newBranchName),
    );

    // Create branch in Gitlab
    createLink({
        text: 'Create branch in Gitlab',
        href: `https://gitlab.exponea.com/app/frontend/-/branches/new?branch_name=${newBranchName}`,
    });

    // Copy create branch command
    const commandConnect = navigator.platform.toLowerCase().includes('win') ? ';' : ' &&';
    createLink(
        {
            text: 'Copy create branch git command',
            id: 'create-branch-command',
        },
        () => {
            const randomString = Math.random()
                .toString(36)
                .substring(2);
            const stashName = `${newBranchName}-${randomString}`;
            const command = `git fetch${commandConnect} git stash save "${stashName}"${commandConnect} git checkout -b ${newBranchName}${commandConnect} git stash apply "stash^{/${stashName}}"${commandConnect} git branch --unset-upstream`;
            copyText(command);
        },
    );
}
