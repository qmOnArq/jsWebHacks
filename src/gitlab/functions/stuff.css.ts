export const css = `
:root {
    --black: rgb(54, 54, 54);
    --blue: rgb(5, 153, 176);
    --green: rgb(164, 189, 10);
    --orange: rgb(255, 166, 21);
    --red: rgb(255, 46, 0)
}

* {
    box-sizing: border-box
}

button {
    border-radius: 4px
}

button.svelte-a6xp29.svelte-a6xp29 {
    color: var(--orange);
    display: inline-block;
    background: var(--black);
    border: 2px solid var(--orange);
    box-shadow: 0 0 20px 0 var(--orange);
    border-radius: 4px;
    position: relative;
    font-weight: bold;
    cursor: pointer;
    height: 37px;
    width: 145px;
}

button.svelte-a6xp29.svelte-a6xp29:active {
    background: var(--orange);
    color: var(--blue);
    border-color: var(--blue)
}

button.svelte-a6xp29.svelte-a6xp29:hover {
    color: var(--blue);
    border-color: var(--blue)
}

button.svelte-a6xp29 .coins.svelte-a6xp29 {
    font-weight: normal
}

button.svelte-a6xp29 .icon.svelte-a6xp29 {
    position: absolute;
    width: 16px;
    height: 16px;
    right: 12px;
    top: 10px;
    display: inline-block;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 350 350" xml:space="preserve">        <desc>Created with Fabric.js 1.7.22</desc>        <defs>        </defs>        <g id="icon" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-1.9444444444444287 -1.9444444444444287) scale(3.89 3.89)" >        <path d="M 50.103 90 h -8.7 C 22.378 90 6.956 69.853 6.956 45 S 22.378 0 41.403 0 l 7.194 0 L 50.103 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,175,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 44.555 1.431 H 32.839 c -1.989 0.665 -3.912 1.542 -5.745 2.637 h 11.8 C 40.704 2.987 42.593 2.094 44.555 1.431 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 33.116 8.454 H 21.315 c -0.971 0.913 -1.906 1.887 -2.798 2.924 h 11.8 C 31.21 10.341 32.145 9.367 33.116 8.454 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 26.112 17.225 H 14.311 c -0.569 0.946 -1.113 1.919 -1.623 2.924 h 11.8 C 24.999 19.144 25.543 18.171 26.112 17.225 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 21.978 25.996 H 10.178 c -0.342 0.957 -0.657 1.932 -0.948 2.924 h 11.8 C 21.321 27.928 21.637 26.953 21.978 25.996 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 19.662 34.767 h -11.8 c -0.172 0.964 -0.323 1.937 -0.446 2.924 h 11.8 C 19.339 36.704 19.491 35.731 19.662 34.767 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 18.757 45 c 0 -0.49 0.016 -0.975 0.028 -1.462 h -11.8 C 6.973 44.025 6.956 44.51 6.956 45 s 0.016 0.975 0.028 1.462 h 11.8 C 18.773 45.975 18.757 45.49 18.757 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 19.216 52.309 h -11.8 c 0.123 0.986 0.274 1.96 0.446 2.924 h 11.8 C 19.491 54.269 19.339 53.296 19.216 52.309 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 21.03 61.08 H 9.23 c 0.291 0.992 0.606 1.967 0.948 2.924 h 11.801 C 21.637 63.047 21.321 62.072 21.03 61.08 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 24.488 69.851 h -11.8 c 0.511 1.005 1.055 1.978 1.623 2.924 h 11.801 C 25.543 71.829 24.999 70.856 24.488 69.851 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 30.318 78.622 h -11.8 c 0.892 1.037 1.826 2.011 2.798 2.924 h 11.801 C 32.145 80.633 31.21 79.659 30.318 78.622 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 38.256 85.554 l -11.163 0.378 c 1.856 1.109 3.804 1.994 5.819 2.662 h 11.715 C 42.41 87.851 40.278 86.828 38.256 85.554 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <ellipse cx="48.597" cy="45" rx="34.447" ry="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,217,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>        <ellipse cx="48.592" cy="45" rx="26.792" ry="35" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,175,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>        <path d="M 63.493 53.266 c -0.072 -6.71 -5.217 -11.576 -11.467 -10.847 l -4.533 0.529 c -3.592 0.419 -6.548 -2.377 -6.589 -6.233 c -0.042 -3.856 2.847 -7.334 6.438 -7.753 l 8.887 -1.037 c 1.332 -0.155 2.399 -1.44 2.383 -2.87 c -0.015 -1.43 -1.107 -2.463 -2.439 -2.307 l -4.209 0.491 l -0.043 -3.986 c -0.015 -1.43 -1.107 -2.463 -2.439 -2.307 c -1.332 0.155 -2.399 1.44 -2.383 2.87 l 0.043 3.994 c -6.183 0.806 -11.132 6.81 -11.06 13.468 c 0.072 6.711 5.217 11.577 11.468 10.847 l 4.533 -0.529 c 3.592 -0.419 6.547 2.378 6.589 6.233 c 0.042 3.856 -2.846 7.333 -6.438 7.753 l -8.887 1.037 c -1.332 0.155 -2.399 1.44 -2.383 2.87 s 1.107 2.463 2.439 2.307 l 4.209 -0.491 l 0.043 3.968 c 0.015 1.43 1.107 2.463 2.439 2.307 c 1.332 -0.155 2.399 -1.44 2.383 -2.87 l -0.043 -3.976 C 58.616 65.929 63.565 59.925 63.493 53.266 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,217,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        </g>        </svg>')
}

button.svelte-a6xp29.svelte-a6xp29 {
    position: absolute;
    top: 2px;
    left: 400px;
    z-index: 10050
}

.background.svelte-tl6uh1 {
    background: rgba(0, 0, 0, 0.9);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999997
}

.modal.svelte-tl6uh1 {
    background: var(--black);
    position: fixed;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    border-radius: 6px;
    box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
    padding: 0 100px 50px 100px;
    z-index: 9999998;
    display: block;
    width: initial;
    height: initial;
}

.close.svelte-tl6uh1 {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    font-weight: bold;
    background: transparent;
    border-color: transparent;
    color: black;
    cursor: pointer;
    text-shadow: none;
}

h1.svelte-te9269.svelte-te9269 {
    color: var(--blue);
    text-shadow: 0 0 20px var(--blue);
    text-align: center
}

.coins.svelte-te9269.svelte-te9269 {
    color: var(--orange);
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    background: var(--black);
    border: 2px solid var(--orange);
    box-shadow: 0 0 20px 0 var(--orange);
    border-radius: 4px;
    user-select: none;
    padding: 5px 10px;
    margin: 10px;
    cursor: pointer
}

.coins.svelte-te9269.svelte-te9269:hover {
    background: var(--red)
}

.coins.svelte-te9269 .amount.svelte-te9269 {
    display: inline-block;
    line-height: 32px;
    position: relative;
    top: -5px
}

.coins.svelte-te9269 .icon.svelte-te9269 {
    position: relative;
    top: 4px;
    right: -4px;
    width: 32px;
    height: 32px;
    display: inline-block;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 350 350" xml:space="preserve">        <desc>Created with Fabric.js 1.7.22</desc>        <defs>        </defs>        <g id="icon" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(-1.9444444444444287 -1.9444444444444287) scale(3.89 3.89)" >        <path d="M 50.103 90 h -8.7 C 22.378 90 6.956 69.853 6.956 45 S 22.378 0 41.403 0 l 7.194 0 L 50.103 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,175,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 44.555 1.431 H 32.839 c -1.989 0.665 -3.912 1.542 -5.745 2.637 h 11.8 C 40.704 2.987 42.593 2.094 44.555 1.431 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 33.116 8.454 H 21.315 c -0.971 0.913 -1.906 1.887 -2.798 2.924 h 11.8 C 31.21 10.341 32.145 9.367 33.116 8.454 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 26.112 17.225 H 14.311 c -0.569 0.946 -1.113 1.919 -1.623 2.924 h 11.8 C 24.999 19.144 25.543 18.171 26.112 17.225 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 21.978 25.996 H 10.178 c -0.342 0.957 -0.657 1.932 -0.948 2.924 h 11.8 C 21.321 27.928 21.637 26.953 21.978 25.996 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 19.662 34.767 h -11.8 c -0.172 0.964 -0.323 1.937 -0.446 2.924 h 11.8 C 19.339 36.704 19.491 35.731 19.662 34.767 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 18.757 45 c 0 -0.49 0.016 -0.975 0.028 -1.462 h -11.8 C 6.973 44.025 6.956 44.51 6.956 45 s 0.016 0.975 0.028 1.462 h 11.8 C 18.773 45.975 18.757 45.49 18.757 45 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 19.216 52.309 h -11.8 c 0.123 0.986 0.274 1.96 0.446 2.924 h 11.8 C 19.491 54.269 19.339 53.296 19.216 52.309 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 21.03 61.08 H 9.23 c 0.291 0.992 0.606 1.967 0.948 2.924 h 11.801 C 21.637 63.047 21.321 62.072 21.03 61.08 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 24.488 69.851 h -11.8 c 0.511 1.005 1.055 1.978 1.623 2.924 h 11.801 C 25.543 71.829 24.999 70.856 24.488 69.851 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 30.318 78.622 h -11.8 c 0.892 1.037 1.826 2.011 2.798 2.924 h 11.801 C 32.145 80.633 31.21 79.659 30.318 78.622 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <path d="M 38.256 85.554 l -11.163 0.378 c 1.856 1.109 3.804 1.994 5.819 2.662 h 11.715 C 42.41 87.851 40.278 86.828 38.256 85.554 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(196,146,20); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        <ellipse cx="48.597" cy="45" rx="34.447" ry="45" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,217,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>        <ellipse cx="48.592" cy="45" rx="26.792" ry="35" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(228,175,24); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) "/>        <path d="M 63.493 53.266 c -0.072 -6.71 -5.217 -11.576 -11.467 -10.847 l -4.533 0.529 c -3.592 0.419 -6.548 -2.377 -6.589 -6.233 c -0.042 -3.856 2.847 -7.334 6.438 -7.753 l 8.887 -1.037 c 1.332 -0.155 2.399 -1.44 2.383 -2.87 c -0.015 -1.43 -1.107 -2.463 -2.439 -2.307 l -4.209 0.491 l -0.043 -3.986 c -0.015 -1.43 -1.107 -2.463 -2.439 -2.307 c -1.332 0.155 -2.399 1.44 -2.383 2.87 l 0.043 3.994 c -6.183 0.806 -11.132 6.81 -11.06 13.468 c 0.072 6.711 5.217 11.577 11.468 10.847 l 4.533 -0.529 c 3.592 -0.419 6.547 2.378 6.589 6.233 c 0.042 3.856 -2.846 7.333 -6.438 7.753 l -8.887 1.037 c -1.332 0.155 -2.399 1.44 -2.383 2.87 s 1.107 2.463 2.439 2.307 l 4.209 -0.491 l 0.043 3.968 c 0.015 1.43 1.107 2.463 2.439 2.307 c 1.332 -0.155 2.399 -1.44 2.383 -2.87 l -0.043 -3.976 C 58.616 65.929 63.565 59.925 63.493 53.266 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,217,73); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />        </g>        </svg>')
}

.items.svelte-te9269.svelte-te9269 {
    margin: 0 auto;
    text-align: center
}

.items.svelte-te9269 .item.svelte-te9269 {
    display: inline-flex;
    position: relative;
    margin: 10px
}

.items.svelte-te9269 .item button.svelte-te9269 {
    cursor: not-allowed;
    color: var(--red);
    border: 2px solid var(--red);
    background: transparent;
    opacity: 0.5
}

.roulette.svelte-te9269.svelte-te9269 {
    text-align: center
}

.roulette.svelte-te9269 .people.svelte-te9269 {
    position: absolute;
    display: inline-block;
    width: 150px;
    color: var(--red);
    border: 2px solid var(--red);
    box-shadow: 0 0 20px 0 var(--red);
    padding: 5px 10px;
    border-radius: 4px;
    user-select: none;
    right: 30px
}

.roulette.svelte-te9269 h2.svelte-te9269 {
    color: var(--orange);
    text-shadow: 0 0 20px var(--orange)
}

.roulette.svelte-te9269 button.svelte-te9269 {
    cursor: pointer;
    width: 100%;
    height: 100px;
    color: var(--green);
    border: 2px solid var(--green);
    box-shadow: 0 0 40px 0 var(--green);
    background: transparent
}

.roulette.svelte-te9269 button.svelte-te9269:active {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--blue)
}

.roulette.svelte-te9269 button.svelte-te9269:hover {
    border-color: var(--orange)
}

h1.svelte-8nm7fu.svelte-8nm7fu, h3.svelte-8nm7fu.svelte-8nm7fu {
    color: var(--blue);
    text-shadow: 0 0 20px var(--blue);
    text-align: center
}

button.svelte-8nm7fu.svelte-8nm7fu {
    display: block;
    margin: 0 auto;
    background: black;
    color: var(--red);
    border: 2px solid var(--red);
    border-radius: 4px;
    cursor: pointer
}

.ending.svelte-8nm7fu.svelte-8nm7fu {
    opacity: 0;
    pointer-events: none;
    transition: all 1s
}

.ending.svelte-8nm7fu h1.svelte-8nm7fu {
    color: var(--red);
    text-shadow: 0 0 20px var(--red)
}

.ending.shown.svelte-8nm7fu.svelte-8nm7fu {
    opacity: 1;
    pointer-events: all
}

h1.svelte-189la7g.svelte-189la7g {
    color: var(--blue);
    text-shadow: 0 0 20px var(--blue);
    text-align: center
}

.main.svelte-189la7g.svelte-189la7g {
    height: 600px
}

button.loss.svelte-189la7g.svelte-189la7g {
    cursor: pointer;
    color: var(--red);
    border: 2px solid var(--red);
    box-shadow: 0 0 40px 0 var(--red);
    background: transparent
}

button.loss.svelte-189la7g.svelte-189la7g:active {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--blue)
}

button.loss.svelte-189la7g.svelte-189la7g:hover {
    border-color: var(--orange)
}

h1.loss.svelte-189la7g.svelte-189la7g {
    color: var(--red);
    text-shadow: 0 0 20px var(--red)
}

button.win.svelte-189la7g.svelte-189la7g {
    cursor: pointer;
    color: var(--green);
    border: 2px solid var(--green);
    box-shadow: 0 0 40px 0 var(--green);
    background: transparent
}

button.win.svelte-189la7g.svelte-189la7g:active {
    background: var(--orange);
    border-color: var(--orange);
    color: var(--blue)
}

button.win.svelte-189la7g.svelte-189la7g:hover {
    border-color: var(--orange)
}

h1.win.svelte-189la7g.svelte-189la7g {
    color: var(--green);
    text-shadow: 0 0 20px var(--green)
}

.roulette.svelte-189la7g.svelte-189la7g {
    text-align: center
}

.result.svelte-189la7g.svelte-189la7g {
    pointer-events: none;
    opacity: 0;
    transition: all 1s;
    text-align: center
}

.result.svelte-189la7g h1.win.svelte-189la7g, .result.svelte-189la7g button.win.svelte-189la7g {
    opacity: 0;
    display: inline-block
}

.result.svelte-189la7g h1.loss.svelte-189la7g, .result.svelte-189la7g button.loss.svelte-189la7g {
    opacity: 0;
    display: none
}

.result.won.svelte-189la7g.svelte-189la7g, .result.lost.svelte-189la7g.svelte-189la7g {
    pointer-events: all;
    opacity: 1
}

.result.won.svelte-189la7g h1.win.svelte-189la7g {
    opacity: 1;
    display: block
}

.result.won.svelte-189la7g button.win.svelte-189la7g {
    opacity: 1;
    display: inline-block
}

.result.won.svelte-189la7g h1.loss.svelte-189la7g, .result.won.svelte-189la7g button.loss.svelte-189la7g {
    opacity: 0;
    display: none
}

.result.lost.svelte-189la7g h1.win.svelte-189la7g, .result.lost.svelte-189la7g button.win.svelte-189la7g {
    opacity: 0;
    display: none
}

.result.lost.svelte-189la7g h1.loss.svelte-189la7g {
    opacity: 1;
    display: block
}

.result.lost.svelte-189la7g button.loss.svelte-189la7g {
    opacity: 1;
    display: inline-block
}

h1.svelte-q7m5h5 {
    color: var(--blue);
    text-shadow: 0 0 20px var(--blue);
    text-align: center
}

.main.svelte-q7m5h5 {
    text-align: center
}

.image.svelte-q7m5h5 {
    background-image: url("https://i.imgur.com/ed8FW3Q.gif");
    width: 375px;
    height: 500px;
    background-position: center;
    background-size: 100%;
    margin: 0 auto
}

.loading.svelte-q7m5h5 {
    transform: scale(0.2);
    height: 100px;
    margin-top: -20px
}

.flip.svelte-prwgq7.svelte-prwgq7 {
    width: 200px;
    height: 200px;
    position: relative;
    margin: 50px auto;
    transform: scale(0.6)
}

.flip.flipped.svelte-prwgq7.svelte-prwgq7 {
    animation: svelte-prwgq7-toss;
    animation-duration: 1s
}

.flip.svelte-prwgq7 .card.flipped.svelte-prwgq7 {
    transform-origin: 50% 50%;
    transform: rotatex(-1980deg);
    transition: all 1s ease 0s
}

.flip.svelte-prwgq7 .card.svelte-prwgq7 {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: 1s;
    background: transparent;
    border: transparent;
}

.flip.svelte-prwgq7 .card .face.svelte-prwgq7 {
    width: 100%;
    height: 100%;
    position: absolute;
    backface-visibility: hidden;
    z-index: 2;
    font-family: Georgia;
    font-size: 3em;
    text-align: center;
    line-height: 200px;
    border-radius: 100px;
    border: 4px solid white;
    cursor: pointer;
    user-select: none
}

.flip.svelte-prwgq7 .card .front.svelte-prwgq7 {
    position: absolute;
    z-index: 1;
    background: black;
    color: var(--green);
    border-color: var(--green)
}

.flip.svelte-prwgq7 .card .back.svelte-prwgq7 {
    transform: rotatex(180deg);
    background: black;
    color: var(--red);
    border-color: var(--red)
}

@keyframes svelte-prwgq7-toss {
    0% {
        transform: scale(0.6)
    }
    50% {
        transform: scale(1)
    }
    100% {
        transform: scale(0.6)
    }
}

.arrow.svelte-kdc911 {
    transition: all 4s ease-out 0s
}

circle.svelte-kdc911, path.svelte-kdc911, text.svelte-kdc911 {
    cursor: pointer;
    transition: 1s all ease-out
}

circle.active.svelte-kdc911, path.active.svelte-kdc911 {
    fill: var(--orange)
}

text.svelte-kdc911 {
    user-select: none;
    fill: var(--blue)
}

text.active.svelte-kdc911 {
    fill: var(--black)
}

.text-nothing.svelte-kdc911 {
    transform: translate(60px, 206px);
    font-size: 25px;
    font-weight: bold;
    transform-origin: 50% 50%
}

.text-0.svelte-kdc911 {
    transform: rotate(-64deg) translate(238px, 201px);
    font-size: 14px;
    font-weight: bold;
    transform-origin: 50% 50%
}

.text-1.svelte-kdc911 {
    transform: rotate(-19deg) translate(238px, 201px);
    font-size: 14px;
    font-weight: bold;
    transform-origin: 50% 50%
}

.text-2.svelte-kdc911 {
    transform: rotate(26deg) translate(238px, 201px);
    font-size: 14px;
    font-weight: bold;
    transform-origin: 50% 50%
}

.text-3.svelte-kdc911 {
    transform: rotate(71deg) translate(238px, 201px);
    font-size: 14px;
    font-weight: bold;
    transform-origin: 50% 50%
}

.svelte-npo534.svelte-npo534, .svelte-npo534.svelte-npo534:before, .svelte-npo534.svelte-npo534:after {
    box-sizing: border-box;
    outline: none
}

.box.svelte-npo534.svelte-npo534 {
    height: 280px;
    width: 280px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #020438;
    border-radius: 100%;
    overflow: hidden
}

.box.svelte-npo534 .percent.svelte-npo534 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 64px
}

.box.svelte-npo534 .water.svelte-npo534 {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    transform: translate(0, 100%);
    background: #4D6DE3;
    transition: all .3s
}

.box.svelte-npo534 .water_wave.svelte-npo534 {
    width: 200%;
    position: absolute;
    bottom: 100%
}

.box.svelte-npo534 .water_wave_back.svelte-npo534 {
    right: 0;
    fill: #C7EEFF;
    animation: svelte-npo534-wave-back 1.4s infinite linear
}

.box.svelte-npo534 .water_wave_front.svelte-npo534 {
    left: 0;
    fill: #4D6DE3;
    margin-bottom: -1px;
    animation: svelte-npo534-wave-front .7s infinite linear
}

@keyframes svelte-npo534-wave-front {
    100% {
        transform: translate(-50%, 0)
    }
}

@keyframes svelte-npo534-wave-back {
    100% {
        transform: translate(50%, 0)
    }
}
`;
