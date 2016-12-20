import * as api from '../api';
import { getIsFetching } from '../reducers'
import { normalize } from 'normalizr';
import * as schema from './schema';

export const addTodo = (text) => (dispatch) =>{
    api.addTodos(text).then(response => {
        //console.log('normalized response', normalize(response,schema.arrayOfTodos));
        dispatch({
            type: "ADD_TODO_SUCCESS",
            response
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
            //console.log('normalized response', normalize(response,schema.arrayOfTodos));
            dispatch({
                type: 'FETCH_TODOS_SUCCESS',
                filter,
                response,
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

export const toggleTodo = (id)=>{
    return {
        type: 'TOGGLE_TODO',
        id
    }
}