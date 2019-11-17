<style>
    h3 {
        margin-bottom: 20px;
    }

    table {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 50px;
    }

    .centered {
        text-align: center;
    }

    th {
        cursor: pointer;
        color: #7477b0;
        text-transform: capitalize;
    }

    th.asc:after {
        padding-left: 10px;
        content: '🔼';
    }

    th.desc:after {
        padding-left: 10px;
        content: '🔽';
    }

    th:hover {
        color: black;
    }

    tbody tr:nth-child(odd) {
        background-color: #f8f7fd;
    }

    td, th {
        border: 1px solid #ebeef7;
        padding: 5px 10px;
    }

    table {
        border: 2px solid #ebeef7;
    }

    .filters div {
        display: flex;
    }

    .filters div input[type=text] {
        flex: 1;
    }

    .filters div input[type=checkbox] {
        margin-left: 10px;
        position: relative;
        top: 5px;
    }
</style>

<script>
    import { sortBy } from "lodash";

    export let allPolicies = [];

    const tablePolicies = allPolicies.map(policy => ({
        methods: policy.methods,
        public: policy.public,
        route: policy.path,
        loginRequired: policy.loginRequired,
        scopeType: policy.permissionRequired ? policy.permissionRequired.scope_type : null,
        permissionName: policy.permissionRequired ? policy.permissionRequired.name : null
    }));

    const columns = ["methods", "route", "public", "loginRequired", "scopeType", "permissionName"];
    const filters = {
        methods: {
            value: "",
            regex: false
        },
        route: {
            value: "",
            regex: false
        },
        permissionName: {
            value: "",
            regex: false
        }
    };

    let sortedBy = { column: "route", direction: 1 };

    $: sortedPolicies = sortedBy.direction === 1 ? sortBy(tablePolicies, sortedBy.column) : sortBy(tablePolicies, sortedBy.column).reverse();
    $: filteredPolicies = sortedPolicies.filter(policy => {
        let result = true;
        Object.keys(filters).forEach(key => {
            const filter = filters[key];
            const value = (Array.isArray(policy[key]) ? policy[key].join(",") : policy[key]) || "";
            if (filter.regex) {
                const regex = new RegExp(filter.value);
                result = result && regex.exec(value);
            } else {
                result = result && value.toLocaleLowerCase().includes(filter.value.toLocaleLowerCase());
            }
        });
        return result;
    });

    function sortByColumn(column) {
        return () => {
            let direction = 1;
            if (column === sortedBy.column) {
                direction = -sortedBy.direction;
            }
            sortedBy = { column, direction };
        };
    }

    function prettyBoolean(value) {
        return !!value ? "✔" : "";
    }

    function prettyScopeType(scopeType) {
        if (!scopeType) {
            return "";
        }

        const types = {
            "PROJECT": "P",
            "ACCOUNT": "A",
            "INSTANCE": "I",
            "INTERNAL": "INT"
        };
        return types[scopeType] || "???";
    }
</script>

<h3>Route permissions:</h3>
<table>
    <thead>
    <tr>
        {#each columns as column}
            <th
                    class:asc={sortedBy.column === column && sortedBy.direction === 1}
                    class:desc={sortedBy.column === column && sortedBy.direction === -1}
                    on:click={sortByColumn(column)}
            >
                {column}
            </th>
        {/each}
    </tr>
    </thead>
    <tbody>
    <tr class="filters">
        <td>
            <div>
                <input type="text" bind:value={filters.methods.value}>
                <input type="checkbox" title="Use regex" bind:checked={filters.methods.regex}>
            </div>
        </td>
        <td>
            <div>
                <input type="text" bind:value={filters.route.value}>
                <input type="checkbox" title="Use regex" bind:checked={filters.route.regex}>
            </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td>
            <div>
                <input type="text" bind:value={filters.permissionName.value}>
                <input type="checkbox" title="Use regex" bind:checked={filters.permissionName.regex}>
            </div>
        </td>
    </tr>
    {#each filteredPolicies as policy, i}
        <tr>
            <td>{policy.methods}</td>
            <td>{policy.route}</td>
            <td class="centered">{prettyBoolean(policy.public)}</td>
            <td class="centered">{prettyBoolean(policy.loginRequired)}</td>
            <td class="centered">{prettyScopeType(policy.scopeType)}</td>
            <td>{policy.permissionName ? policy.permissionName : ''}</td>
        </tr>
    {/each}
    </tbody>
</table>
