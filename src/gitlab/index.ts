import './gitlab';

const now = new Date();
if (now.getDate() === 1 && now.getMonth() === 3) {
    if (localStorage.getItem('no_geese_allowed') == null) {
        require('./functions/bundle');
    }
}
