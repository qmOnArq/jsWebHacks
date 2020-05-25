export namespace Colors {
    export function getGradientColor(start_color: string, end_color: string, percent: number) {
        // strip the leading # if it's there
        start_color = start_color.replace(/^\s*#|\s*$/g, '');
        end_color = end_color.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (start_color.length == 3) {
            start_color = start_color.replace(/(.)/g, '$1$1');
        }

        if (end_color.length == 3) {
            end_color = end_color.replace(/(.)/g, '$1$1');
        }

        // get colors
        const start_red = parseInt(start_color.substr(0, 2), 16);
        const start_green = parseInt(start_color.substr(2, 2), 16);
        const start_blue = parseInt(start_color.substr(4, 2), 16);

        const end_red = parseInt(end_color.substr(0, 2), 16);
        const end_green = parseInt(end_color.substr(2, 2), 16);
        const end_blue = parseInt(end_color.substr(4, 2), 16);

        // calculate new color
        const diff_red = end_red - start_red;
        const diff_green = end_green - start_green;
        const diff_blue = end_blue - start_blue;

        let diff_red_n = (diff_red * percent + start_red).toString(16).split('.')[0];
        let diff_green_n = (diff_green * percent + start_green).toString(16).split('.')[0];
        let diff_blue_n = (diff_blue * percent + start_blue).toString(16).split('.')[0];

        // ensure 2 digits by color
        if (diff_red_n.length == 1) {
            diff_red_n = '0' + diff_red_n;
        }
        if (diff_green_n.length == 1) {
            diff_green_n = '0' + diff_green_n;
        }
        if (diff_blue_n.length == 1) {
            diff_blue_n = '0' + diff_blue_n;
        }

        return '#' + diff_red_n + diff_green_n + diff_blue_n;
    }

    export function isContrastingColorDark(color: { r: number; g: number; b: number }) {
        // Yes those constants are kinda magic, hard to name there since they are just observed from human
        // perception of colors
        const lightness = Math.round((color.r * 299 + color.g * 587 + color.b * 114) / 1000);
        return lightness > 180;
    }

    function hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
        return 'rgb(' + parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) + ')';
    }

    /**
     * @param {string} color - color in hex or rgb() format
     * @returns {Object} - {r: number, g: number, b: number}
     */
    export function getRGBValues(color: string) {
        if (color.charAt(0) === '#') {
            color = hexToRgb(color);
        }

        const match = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)!;
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
        };
    }
}
