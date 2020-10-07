import { Deferred } from './deferred';

export async function asyncForEach<T>(
    array: ArrayLike<T>,
    callback: (item: T, index: number, list: ArrayLike<T>) => Promise<unknown>,
) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export function readFileAsText(file: File): Promise<string> {
    const result = new Deferred<string>();

    const reader = new FileReader();
    reader.onload = event => {
        result.resolve(event?.target?.result);
    };
    reader.readAsText(file);

    return result.promise;
}

export function sleep(ms: number): Promise<void> {
    const result = new Deferred<void>();

    setTimeout(() => {
        result.resolve();
    }, ms);

    return result.promise;
}
