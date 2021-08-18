# jsWebHacks

## Usage
1. Download and install [Custom JavaScript for Websites 2](https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk?hl=en)
2. Navigate to website you wish to run script on
3. Open installed extension
4. Paste the contents of [updater.js](https://raw.githubusercontent.com/qmOnArq/jsWebHacks/master/updater.js) into the extension
5. Modify `const script = '';` by using correct script filename (all available scripts are in `/scripts` folder)

Optionally, if you do not want to use autoupdater, you can copy and paste the script directly.

## Contribution

**Prerequisites**
- Node 14+ required

1. Install dependencies:
    ```
    npm install
    ```

1. Run webserver:

    ```
    npm run dev
    ```
   
1. Turn on *DEV mode* by setting `MONAR_JS_WEB_HACK_DEV` in localStorage
   ```
   localStorage.setItem('MONAR_JS_WEB_HACK_DEV','true')
   ```
