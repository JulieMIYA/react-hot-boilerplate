import {v4} from 'node-uuid';
import * as api from './api';
import {getIsFetching} from './reducers'

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        id: v4(),
        text
    }
}

const requestTodos = (filter) =>({
    type: 'REQUEST_TODOS',
    filter
});

const receiveTodos = (filter, response) => ({
    type: 'RECEIVE_TODOS',
    filter,
    response,
});

/*
export const fetchTodos = (filter) =>
    api.fetchTodos(filter).then(response =>
        receiveTodos(filter, response)
    );
*/

export const fetchTodos = (filter) => (dispatch,getState) => {
    if(getIsFetching(getState(), filter))
    {
        return Promise.resolve();
    }//return;

    dispatch(requestTodos(filter));
    return api.fetchTodos(filter).then(response => {
        dispatch(receiveTodos(filter, response));
    });
}

export const toggleTodo = (id)=>{
    return {
        type: 'TOGGLE_TODO',
        id
    }
}