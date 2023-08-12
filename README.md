# keenstore

*Zero-dependency data store offering subscription to changes*

## Installation

```
npm i keenstore
```

## Usage

```ts
import { Store } from 'keenstore';

let store = new Store({ value: 42 });

// Read the data in the store
store.getState(); // > { value: 42 }

// Subscribe to updates in the store and add a callback for each
// update via `store.setState()`
store.onUpdate(() => {
    console.log(store.getState().value);
});

// Update the data in the store and trigger the update callbacks
store.setState({ value: 100 });
```

```ts
// To unsubscribe an update callback from the store use the
// returned value of the `store.onUpdate()` method
let unsubscribe = store.onUpdate(() => {
    console.log(store.getState().value);
});

unsubscribe();
```

## See also

- [*react-keenstore*](https://github.com/axtk/react-keenstore)
