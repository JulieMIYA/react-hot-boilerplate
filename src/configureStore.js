//import rootreducer
import todoApp from './reducers'

import { createStore } from 'redux'

const addLoggingToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        console.group(action.type);
        console.log('%c prev state', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next state', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    };
};
const addPromiseSupportToDispatch = (store) => {
    const rawDispatch = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(rawDispatch);
        }
        return rawDispatch(action);
    };
}

const configureStore = () => {
    //const persistedData = loadState();
    const store = createStore(
        todoApp
    )
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }
    store.dispatch = addPromiseSupportToDispatch(store);
    /*
    store.subscribe(throttle(() => {
        saveState({todos: store.getState().todos});
    }, 1000));*/
    return store;
}

export default configureStore;