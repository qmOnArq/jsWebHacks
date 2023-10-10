export const changelogNotes = [
    {
        date: '10.10.2023',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Changing target branch at "New pipeline" screen from now remembers the state of variables and remove them</li>
        <li>Removed changelog notification glow using too much CPU</li>
        <li>Added notification badge with number of changelog notifications</li>
        <li>Changelog notifications center now supports dark mode</li>
        <li>Frontend: Fixed "Run E2E" button on Merge Requests</li>
    </ul>
    `,
    },
    {
        date: '2.2.2023',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Fix: Non-existing handle for "Run E2E" button</li>
    </ul>
    `,
    },
    {
        date: '5.7.2022',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Fix labels selector in Create MR screen for new Gitlab version</li>
    </ul>
    `,
    },
    {
        date: '6.9.2021',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Fixes for new gitlab version</li>
    </ul>
    `,
    },
    {
        date: '24.3.2021',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Fix: Variables stay persistent when changing branches on create pipeline screen in any repository</li>
        <li>Fix: E2E Buttons rendering in other repositories than e2e</li>
        <li>Fix: E2E Buttons rendering above variable form</li>
    </ul>
    `,
    },
    {
        date: '19.3.2021',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Resolved problems with E2E variables when switching branches</li>
    </ul>
    `,
    },
    {
        date: '5.3.2021',
        text: `
    <h1>Changes</h1>
    <ul>
        <li>Deprecated showing assignees in favor of reviewers on MR list page</li>
        <li>Fix cases when new schedule which hasn't been run yet broke badges</li>
        <li>Style fixes in changelog</li>
    </ul>
    `,
    },
    {
        date: '3.2.2021',
        text: `
<h1>Changes</h1>
<ul>
    <li>Integration of 'Run E2E' button with app repo</li>
    <li>E2E pipeline: New automatic variables SOURCE_PROJECT_ID, SOURCE_PIPELINE_URL</li>
    <li>E2E pipeline: Changing the branch preserves automatic variables like ENVIRONMENT (but still deletes manual variables)</li>
    <li>Frontend MR: Improved parsing of frontend image hash, should show less of "Docker Job error"</li>
</ul>
<h1>Known issues</h1>
<ul>
    <li>E2E pipeline: Selecting predefined variables is still buggy in some cases (buttons with multiple variables assigned, clicking to remove variable)</li>
</ul>
        `,
    },
    {
        date: '18.12.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>Support for Draft MRs</li>
</ul>
<h1>Known issues</h1>
<ul>
    <li>E2E pipelines: Selecting predefined variables is buggy in some cases (buttons with multiple variables assigned, clicking to remove variable)</li>
    <li>E2E pipelines: Changing branch deletes all set variables</li>
    <li>Commit approvals: Whole feature has to be retested with new gitlab comments</li>
    <li>Commit approvals: Clicking on show next/previous commit bugs the Approve commit button</li>
</ul>
        `,
    },
    {
        date: '16.12.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>Initial fixes for new gitlab version</li>
</ul>
        `,
    },
    {
        date: '13.10.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li><b>E2E only:</b> Pipeline variables now can be toggled and support multi-value strings</li>
</ul>
        `,
    },
    {
        date: '04.08.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li><b>E2E only:</b> More pipeline variable options added</li>
</ul>
        `,
    },
    {
        date: '27.07.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>Improvements for running E2E pipeline from FE repo</li>
    <li>Improvements for specifying E2E pipeline variables</li>
</ul>
        `,
    },
    {
        date: '26.07.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>Fixed task count shown in merge request list</li>
</ul>
        `,
    },

    {
        date: '04.07.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>Nightly pipeline badges brought back to action</li>
</ul>
        `,
    },
    {
        date: '26.06.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li><b>FE only:</b> Automatically set "No. approvals required" based on labels</li>
</ul>
        `,
    },
    {
        date: '25.05.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>New branching strategy is here</li>
    <li>The goose has been captured and moved to a pond</li>
</ul>
        `,
    },
    {
        date: '16.03.2020',
        text: `
<h1>Bugfixes</h1>
<ul>
    <li>Attempt to fix approve button after gitlab update</li>
</ul>
        `,
    },
    {
        date: '22.01.2020',
        text: `
<h1>Bugfixes</h1>
<ul>
    <li>Nightly pipeline badges used by FE repository should be working correctly again</li>
</ul>
        `,
    },
    {
        date: '18.01.2020',
        text: `
<h1>Commit approvals</h1>
<p>
    You can now approve separate commits in Merge Request.
</p>
<p>
    Please use this just a simple helping tool and do not rely on it for actual code review. For proper MR approving still use the actual gitlab approve button.
</p>
        `,
    },
] as const;
