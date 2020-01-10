export function invertColor(hexTripletColor: string) {
    if (hexTripletColor.startsWith('rgb(')) {
        hexTripletColor = rgbToHex(hexTripletColor);
    }

    let color: string | number = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xffffff ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ('000000' + color).slice(-6); // pad with leading zeros
    color = '#' + color; // prepend #
    return color;
}

export function singleRgbToHex(rgb: string) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}

export function rgbToHex(rgb: string) {
    const regexResult = /\D*(\d+)\D*(\d+)\D*(\d+)/.exec(rgb);
    if (regexResult && regexResult[1] && regexResult[2] && regexResult[3]) {
        return `#${singleRgbToHex(regexResult[1])}${singleRgbToHex(regexResult[2])}${singleRgbToHex(regexResult[3])}`;
    }
    return '#000000';
}
