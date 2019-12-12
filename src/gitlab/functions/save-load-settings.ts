export function loadSettings() {
    const settings = localStorage.getItem('monar_SETTINGS');
    window.monar_SETTINGS = settings
        ? JSON.parse(settings)
        : {
              hideWip: true,
          };
}

export function saveSettings() {
    localStorage.setItem('monar_SETTINGS', JSON.stringify(window.monar_SETTINGS));
}
