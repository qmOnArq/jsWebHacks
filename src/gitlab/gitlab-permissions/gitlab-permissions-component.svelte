<style>
    #monar-permissions-viewer {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 50;
        box-sizing: border-box;
        padding: 20px 50px;
    }
</style>

<script>
    import GitlabPermissionsPolicies from './gitlab-permissions-policies.svelte';
    import GitlabPermissionsRoles from './gitlab-permissions-roles.svelte';
    import yamlParser from "js-yaml";

    export let yaml = "";

    const data = yamlParser.load(yaml);
    let allRoles = {};
    let allPolicies = [];

    Object.keys(data.data).forEach(key => {
        data.data[key] = yamlParser.load(data.data[key]);
        allRoles = { ...allRoles, ...data.data[key].roles };
        allPolicies = [...allPolicies, ...data.data[key].policies];
    });
</script>

<div id="monar-permissions-viewer">
    <GitlabPermissionsRoles allRoles={allRoles}></GitlabPermissionsRoles>
    <GitlabPermissionsPolicies allPolicies={allPolicies}></GitlabPermissionsPolicies>
</div>
