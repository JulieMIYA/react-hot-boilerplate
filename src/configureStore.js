//import rootreducer
import todos from './reducers'

import { createStore , applyMiddleware } from 'redux'
//import middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'


/*const thunk = (store) => (next) => (action) =>(
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action)
)*/
const configureStore = () => {
    //const persistedData = loadState();

    const middlewares = [thunk];
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