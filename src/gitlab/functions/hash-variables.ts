export function getHashVariables() {
    let hashString = location.hash;
    if (hashString[0] === '#') {
        hashString = hashString.substr(1, hashString.length);
    }

    const result: Record<string, string> = {};

    const parts = hashString.split('~&~');
    parts.forEach(part => {
        const split = part.split('~=~');
        if (!split[0]) {
            return;
        }
        result[split[0]] = split[1];
    });

    return result;
}

export function createHashString(values: Record<string, string>) {
    let result = '';

    Object.keys(values).forEach(key => {
        result += key + '~=~' + values[key] + '~&~';
    });

    return result ? '#' + result : '';
}
