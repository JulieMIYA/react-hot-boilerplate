//import rootreducer
import todos from './reducers'

import { createStore , applyMiddleware } from 'redux'
//import middleware
import promise from 'redux-promise'
import createLogger from 'redux-logger'


const configureStore = () => {
    //const persistedData = loadState();

    const middlewares = [promise];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    const store = createStore(
        todos,
        // initalState ,
        applyMiddleware(...middlewares) // A store enhancer that applies the given middleware.
    );

    return store;
}

export default configureStore;