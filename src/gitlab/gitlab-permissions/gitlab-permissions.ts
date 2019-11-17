//@ts-ignore
import GitlabPermissionsComponent from './gitlab-permissions-component.svelte';

declare const $: any;

let permissionsComponent: any;

export function addPermissionsButton() {
    if ($('#monar-permissions-button').length !== 0) {
        return;
    }
    $('.header-content').append(`
        <a
            id="monar-permissions-button"
            href="javascript:void(0)"
            class="btn btn-sm btn-info"
            style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
        >Permissions</a>
    `);

    $('#monar-permissions-button').on('click', function() {
        if ($('#monar-permissions-viewer').length === 0 || $('#monar-permissions-viewer').is(':hidden')) {
            $.ajax(`/ops/kube/raw/master/auth/iam/iam-static-access.yaml`)
                .then((data: string) => {
                    if (permissionsComponent) {
                        permissionsComponent.$set({ yaml: data });
                        $('#monar-permissions-viewer').show();
                    } else {
                        $('.content-wrapper').css('position', 'relative');
                        permissionsComponent = new GitlabPermissionsComponent({
                            target: $('.content-wrapper')[0],
                            props: {
                                yaml: data,
                            },
                        });
                    }
                })
                .catch(console.error);
        } else {
            $('#monar-permissions-viewer').hide();
        }
    });
}
