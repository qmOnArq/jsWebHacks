export async function asyncForEach<T>(array: T[], callback: (item: T, index: number, list: T[]) => Promise<unknown>) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
