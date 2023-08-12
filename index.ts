export type StoreStateUpdate<T> = (state: T) => T;
export type StoreUpdateCallback = () => void;

export class Store<T> {
    state: T;
    listeners: StoreUpdateCallback[];
    constructor(data: T) {
        this.state = data;
        this.listeners = [];
    }
    onUpdate(callback: StoreUpdateCallback) {
        this.listeners.push(callback);

        return () => {
            for (let i = this.listeners.length - 1; i >= 0; i--) {
                if (this.listeners[i] === callback)
                    this.listeners.splice(i, 1);
            }
        };
    }
    getState() {
        return this.state;
    }
    setState(update: T | StoreStateUpdate<T>) {
        this.state = update instanceof Function ? update(this.state) : update;

        for (let listener of this.listeners)
            listener();
    }
}
