//import local state Loader
import { loadState, saveState } from './localStorage'
//import rootreducer
import todoApp from './reducers'

import { createStore } from 'redux'
import throttle from 'lodash/throttle';


const configureStore = () => {
    const persistedData = loadState();
    const store = createStore(
        todoApp,
        persistedData
    )
    store.subscribe(throttle(() => {
        saveState({todos: store.getState().todos});
    }, 1000));
    return store;
}

export default configureStore;