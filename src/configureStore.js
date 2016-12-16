//import rootreducer
import todoApp from './reducers'

import { createStore } from 'redux'

const addLoggingToDispatch = (store) => {
    const next = store.dispatch;
    if (!console.group) {
        return next;
    }else{
        return (action) => {
            console.group(action.type);
            console.log('%c prev state', 'color: gray', store.getState());
            console.log('%c action', 'color: blue', action);
            const returnValue = next(action);
            console.log('%c next state', 'color: green', store.getState());
            console.groupEnd(action.type);
            return returnValue;
        };
    }
};

const addPromiseSupportToDispatch = (store) => {
    const next = store.dispatch;
    return (action) => {
        if (typeof action.then === 'function') {
            return action.then(next);
        }
        return next(action);
    };
}

const wrapDispatchWithMiddlewares = (store, middlewares) => {
    middlewares.forEach(middleware =>
        store.dispatch = middleware(store)
    );
};

const configureStore = () => {
    //const persistedData = loadState();
    const store = createStore(
        todoApp
    )
    const middlewares = []; //an array of functions that will be applied later as a single step.

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(addLoggingToDispatch);
    }

    middlewares.push(addPromiseSupportToDispatch);
    wrapDispatchWithMiddlewares(store, middlewares);
    return store;
}

export default configureStore;