export function addCustomStyles() {
    if ($('#monar-styles').length === 0) {
        const css = `<style id="monar-styles">
                .remove-before::before{display: none !important;} .remove-after::after{display: none !important;}

                @keyframes monar_background_blink {
                    100% {
                    background-color: rgba(0,0,0,0);

                    }
                }

                .monar-glow {
                  color: #fff;
                  -webkit-animation: monar-glow 1s ease-in-out infinite alternate;
                  -moz-animation: monar-glow 1s ease-in-out infinite alternate;
                  animation: monar-glow 1s ease-in-out infinite alternate;
                }

                @-webkit-keyframes monar-glow {
                  from {
                    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e6000b, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
                  }
                  to {
                    text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
                  }
                }
            </style>`;

        document.head.insertAdjacentHTML('beforeend', css);
    }
}
