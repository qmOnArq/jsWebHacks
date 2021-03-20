import './gitlab';
import './functions/stuff';
import { css } from "./functions/stuff.css";

const date = new Date();
const day = date.getDate();
const month = date.getMonth();
const style = document.createElement('style');
style.textContent = css;
document.head.append(style);
if (!(month == 3 && day == 1)) {
    $('.svelte-a6xp29').css('display', 'none');
}
