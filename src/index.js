import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { createStore } from 'redux'

const todo = (state, action)=>{
	switch (action.type){
  	case 'ADD_TODO':
    	return {
      	id: action.id,
        text: action.text,
        completed: false
      }
     case 'TOGGLE_TODO' :
     	if(state.id !==action.id)
      	return state;
      else
      	return {...state, completed: !state.completed}
     default :
     	return state;
  }
}
const todos = (state = [], action)=>{
	switch (action.type){
  	case 'ADD_TODO':
    	return [...state, todo(undefined, action)]
     case 'TOGGLE_TODO' :
     	return state.map(t=>todo(t, action));
     default :
    	 return state;
  }
}

const visibilityFilter= (
	state = 'SHOW_ALL',
  action ) => {
  	switch (action.type){
    	case 'SET_VISIBILTY_FILTER':
      	return action.filter;
      default:
      	return state;
    }
  };

const todoApp = combineReducers({
  todos,visibilityFilter
});

const store = createStore(todoApp);
const FilterLink = ({
	filter,
	currentFilter,
	children }) =>{
		if(currentFilter=== filter)
		return <span>{children}</span>
		return (
			<a href ="#"
				onClick= { e=>{
					e.preventDefault();
					store.dispatch({
						type : "SET_VISIBILTY_FILTER",
						filter
					});
				}}
			>
			{children}
			</a>
		)
	}
const getVisibileTodos = (todos, filter)=>{
	switch (filter){
		case "SHOW_ALL":
			return todos;
		case "SHOW_ACTIVE":
			return todos.filter(
				t=> !t.completed
			)
		case "SHOW_COMPLETED":
			return todos.filter(
				t=> t.completed
			)
		default : return todos;;
	}
}
let nextTodoId = 0;
class TodoApp extends Component {
  render() {
		const {todos,visibilityFilter}= this.props;
		const visibleTodos = getVisibileTodos(todos, visibilityFilter);
    return (
      <div>
			<p>Application Version 1: with one single component TodoApp </p>
      	<input ref={node=>{this.input = node; }}/>
        <button onClick= {
          ()=>{
						if(this.input.value!=="")
	            store.dispatch({
	              type: "ADD_TODO",
	              text: this.input.value,
	              id: nextTodoId++
	            });
						this.input.value= "";
          }
        }>Add Todo</button>
        <ul>
          {visibleTodos.map(todo =>
             <li key= {todo.id} onClick={()=>{
							 store.dispatch({
								 type: "TOGGLE_TODO",
								 id: todo.id
							 });
						 }}
						  style= {{
								textDecoration: todo.completed? 'line-through': 'none'
							}}>
              {todo.text}
             </li>
          )}
        </ul>
				<p>
					Show :
					{' '}
					<FilterLink filter = "SHOW_ALL" currentFilter = {visibilityFilter}>ALL</FilterLink>
					{' '}
					<FilterLink filter = "SHOW_ACTIVE" currentFilter = {visibilityFilter}>ACTIVE</FilterLink>
					{' '}
					<FilterLink filter = "SHOW_COMPLETED" currentFilter = {visibilityFilter} >COMPLETED</FilterLink>
				</p>
      </div>
    );
  }
}

const render  = ()=>{
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
}

store.subscribe(render);
render();
