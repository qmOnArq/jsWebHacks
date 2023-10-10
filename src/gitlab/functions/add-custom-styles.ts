export function addCustomStyles() {
    if ($('#monar-styles').length === 0) {
        const css = `<style id="monar-styles">
                .remove-before::before{display: none !important;} .remove-after::after{display: none !important;}

                @keyframes monar_background_blink {
                    100% {
                        background-color: rgba(0,0,0,0);
                    }
                }

                 .close-button {
                    position: absolute;
                    right: 0;
                    top: 0;
                    color: #111;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 130%;
                    padding: 3px 10px;
                    margin: 5px 5px;
                    border-radius: 5px;
                }

                body.gl-dark .close-button {
                    color:#ddd;
                }

                .close-button:hover,
                body.gl-dark .close-button:hover {
                    text-decoration: none;
                    color:red;
                    background-color:rgba(255,0,0,0.2)
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

                 /* New UI */
                .page-with-super-sidebar .content-wrapper {
                    padding-top: 0 !important;
                }

                .page-with-super-sidebar .top-bar-fixed {
                    position: static !important;
                }

                .monar-background {
                    background: white;
                }

                body.gl-dark .monar-background {
                        background: var(--gray-50); /* variable from gitlab ui */
                    }
                }
            </style>`;

        document.head.insertAdjacentHTML('beforeend', css);
    }
}
