import { combineReducers } from 'redux'
import todo from './todo'

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO':
        case 'TOGGLE_TODO':
            return {
                ...state,
                [action.id]: todo(state[action.id], action),
            };
        default:
            return state;
    }
};

const allIds = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, action.id];
        default :
            return state;
    }
};


const todos = combineReducers({
    byId,
    allIds
});

export default todos;
// Since the state shape changed, I needed to update the selectors
// that depend on it. I wrote the private selector called `getAllTodos`
// that just assembles all the todos objects from the state by
// mapping the IDs to the lookup table.
const getAllTodos = (state) =>
    state.allIds.map(id => state.byId[id]);

export const getVisibleTodos = (state, filter) => {
    const allTodos = getAllTodos(state);
    switch (filter) {
        case 'all':
            return allTodos;
        case 'completed':
            return allTodos.filter(t => t.completed);
        case 'active':
            return allTodos.filter(t => !t.completed);
        default:
            throw new Error(`Unknown filter: ${filter}.`);
    }
};