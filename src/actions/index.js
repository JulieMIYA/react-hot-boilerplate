import * as api from '../api';
import { getIsFetching } from '../reducers'
import { normalize } from 'normalizr';
import * as schema from './schema';

export const addTodo = (text) => (dispatch) =>{
    api.addTodos(text).then(response => {
        //console.log('normalized response', );
        dispatch({
            type: "ADD_TODO_SUCCESS",
            response: normalize(response,schema.todo)
        })
    })
}


export const fetchTodos = (filter) => (dispatch,getState) => {
    if(getIsFetching(getState(), filter))
    {
        return Promise.resolve();
    }//return;

    dispatch({
        type: 'FETCH_TODOS_REQUEST',
        filter
    });
    return api.fetchTodos(filter).then(
        response => {
            //console.log('normalized response', ));
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response: normalize(response,schema.arrayOfTodos),
            });
        },
        error =>{
            dispatch({
                type: 'FETCH_TODOS_FAILURE',
                filter,
                message :error.message|| 'Something went wrong'
            })
        }
    );
}

export const toggleTodo = (id) => (dispatch) => {
    api.toggleTodos(id).then(response => {
        dispatch({
            type: 'TOGGLE_TODO_SUCCESS',
            response: normalize(response, schema.todo)
        })
    })
}