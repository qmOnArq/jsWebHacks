export class Deferred<T> implements Promise<T> {
    [Symbol.toStringTag]: any;

    public resolve!: (...rest: any[]) => void;
    public reject: any;

    public promise: Promise<T>;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    then<TResult1, TResult2>(
        onfulfilled: (value: T) => PromiseLike<TResult1> | TResult1,
        onrejected: (reason: any) => PromiseLike<TResult2> | TResult2,
    ): Promise<TResult2 | TResult1>;
    then<TResult>(
        onfulfilled: (value: T) => PromiseLike<TResult> | TResult,
        onrejected?: (reason: any) => PromiseLike<TResult> | TResult,
    ): Promise<TResult>;
    then(): Promise<T>;
    then(onfulfilled?: any, onrejected?: any): any {
        return this.promise.then(onfulfilled, onrejected);
    }

    catch<TResult>(onrejected: (reason: any) => PromiseLike<TResult> | TResult): Promise<TResult | T>;
    catch(onrejected: (reason: any) => PromiseLike<T> | T): Promise<T>;
    catch(onrejected: any): any {
        return this.promise.catch(onrejected);
    }

    finally(onfinally?: (() => void) | undefined | null): Promise<T> {
        throw new Error('NOT IMPLEMENTED');
    }
}
