export const changelogNotes = [
    {
        date: '26.06.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li><b>FE only:</b> Automatically set "No. approvals required" based on labels</li>
</ul>
        `
    },
    {
        date: '25.05.2020',
        text: `
<h1>Changes</h1>
<ul>
    <li>New branching strategy is here</li>
    <li>The goose has been captured and moved to a pond</li>
</ul>
        `
    },
    {
        date: '16.03.2020',
        text: `
<h1>Bugfixes</h1>
<ul>
    <li>Attempt to fix approve button after gitlab update</li>
</ul>
        `
    },
    {
        date: '22.01.2020',
        text: `
<h1>Bugfixes</h1>
<ul>
    <li>Nightly pipeline badges used by FE repository should be working correctly again</li>
</ul>
        `
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
