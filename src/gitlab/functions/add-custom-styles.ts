export function addCustomStyles() {
    if ($('#monar-styles').length === 0) {
        const css = `<style id="monar-styles">
                .remove-before::before{display: none !important;} .remove-after::after{display: none !important;}

                @keyframes monar_background_blink {
                    100% {
                    background-color: rgba(0,0,0,0);

                    }
                }

                .monar-notification-dot {
                    position: absolute;
                    top: 0;
                    right: -5px;
                    padding: 1px 7px;
                    border-radius: 50%;
                    font-size: 80%;
                    background-color:red;
                    box-shadow: 0px 1px 2px rgba(0,0,0, 0.3);
                    transform: scale(1);
                    animation: pop 0.2s ease;
                }
            </style>`;

        document.head.insertAdjacentHTML('beforeend', css);
    }
}
