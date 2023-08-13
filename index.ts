export type StoreStateUpdate<T> = (state: T) => T;
export type StoreUpdateCallback = () => void;

export class Store<T> {
    state: T;
    callbacks: StoreUpdateCallback[];
    constructor(data: T) {
        this.state = data;
        this.callbacks = [];
    }
    onUpdate(callback: StoreUpdateCallback) {
        this.callbacks.push(callback);

        return () => {
            for (let i = this.callbacks.length - 1; i >= 0; i--) {
                if (this.callbacks[i] === callback)
                    this.callbacks.splice(i, 1);
            }
        };
    }
    getState() {
        return this.state;
    }
    setState(update: T | StoreStateUpdate<T>) {
        this.state = update instanceof Function ? update(this.state) : update;

        for (let callback of this.callbacks)
            callback();
    }
}
