import { KeyValuePair } from '../../types/name-value-pair.type';

export function getHashVariables(): KeyValuePair {
    let hashString = location.hash;

    if (hashString[0] === '#') {
        hashString = hashString.substr(1, hashString.length);
    }

    const variables: KeyValuePair = {};

    new URLSearchParams(hashString).forEach((value, key) => {
        variables[key] = value;
    });

    return variables;
}

export function createHashString(values: KeyValuePair) {
    if (!Object.values(values).length) {
        return '';
    }
    return `#${new URLSearchParams(values).toString()}`;
}
