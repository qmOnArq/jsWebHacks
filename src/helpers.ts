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

export default function retry<T>(
    fn: () => Promise<T>,
    conditionFn: (input: T) => boolean,
    options: RetryingOptions = { waitingInterval: 5000, maxTries: 10 },
): Promise<T> {
    function tryToGetResult(retry: number): Promise<T> {
        return fn().then(result => {
            if (conditionFn(result)) {
                return result;
            }
            if (retry <= options.maxTries) {
                // sleep the specified time
                return sleep(options.waitingInterval).then(() => tryToGetResult(retry + 1));
            } else {
                throw new Error(`Retrying failed after ${options.maxTries} tries.`);
            }
        });
    }

    return tryToGetResult(1);
}

export interface RetryingOptions {
    waitingInterval: number;
    maxTries: number;
}

export function objectFromEntries(arr: any[]) {
    return Object.assign(
        {},
        ...Array.from(arr, ([key, value]) => {
            return { [key]: value };
        }),
    );
}

export function objectFilter(obj: any, filterFn: ([key, value]: any) => boolean) {
    return objectFromEntries(Object.entries(obj).filter(filterFn));
}
