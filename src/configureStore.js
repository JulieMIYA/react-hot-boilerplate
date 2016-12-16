//import rootreducer
import todoApp from './reducers'


import { createStore , applyMiddleware } from 'redux'
//import middleware
import promise from 'redux-promise'
import createLogger from 'redux-logger'


const configureStore = () => {
    //const persistedData = loadState();

    const middlewares = [];
    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }
    middlewares.push(promise);

    const store = createStore(
        todoApp,
        // initalState ,
        applyMiddleware(...middlewares) // A store enhancer that applies the given middleware.
    );

    return store;
}


export default configureStore;