export function addCustomStyles() {
    if ($('#monar-styles').length === 0) {
        const css = `<style id="monar-styles">
                .remove-before::before{display: none !important;} .remove-after::after{display: none !important;}

                @keyframes monar_background_blink {
                    100% {
                    background-color: rgba(0,0,0,0);

                    }
                }
            </style>`;

        document.head.insertAdjacentHTML('beforeend', css);
    }
}
