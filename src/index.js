import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { createStore } from 'redux'

/*----------------- define reducer -----------------*/
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
const visibilityFilter= (state = 'SHOW_ALL',action ) => {
  	switch (action.type){
    	case 'SET_VISIBILTY_FILTER':
      	return action.filter;
      default:
      	return state;
    }
  };
/*----------------- define root reducer -----------------*/
const todoApp = combineReducers({
  todos,visibilityFilter
});

/*----------------- define store with passing root reducer -----------------*/
const store = createStore(todoApp);

/*----------------- define components -----------------*/
const AddTodo = ({
	onAddClick
	})=>{
		let inputEle;
		return (
			<div>
				<input ref={node=>{inputEle = node; }}/>
				<button onClick= {
					()=>{
						if(inputEle.value!=="")
						{
							onAddClick(inputEle.value);
							inputEle.value= "";
						}
					}
				}>Add Todo</button>
			</div>
		);
};

// don't sepcify the action of component, but declare only the presentation of the component
const Todo = ({
	onClick, completed, text
	})=>(
		<li
		  onClick={
				onClick
		}
		 style= {{
			 textDecoration: completed? 'line-through': 'none'
		 }}>
		 {text}
		</li>
	);
const TodosList = ({
		todos,
		onTodoClick
	}) => (
			<ul>
				{todos.map(todo =>
					<Todo
						key={todo.id} {...todo} onClick = {
						()=> onTodoClick(todo.id)
					}></Todo>
				)}
			</ul>
		);

const FilterLink = ({
	filter,
	currentFilter,
	children,
	onClick
	}) => {
		if(currentFilter === filter)
			return (<span>{children}</span>);
		return (
			<a href ="#"
				onClick= { e=>{
					e.preventDefault();
					onClick(filter);
				}} >
			{children}
			</a>
		);
	}

const Footer =({visibilityFilter, onFilterClick})=>(
	<p>
		Show :
		{' '}
		<FilterLink filter = "SHOW_ALL" currentFilter = {visibilityFilter} onClick={onFilterClick}>ALL</FilterLink>
		{' '}
		<FilterLink filter = "SHOW_ACTIVE" currentFilter = {visibilityFilter} onClick={onFilterClick}>ACTIVE</FilterLink>
		{' '}
		<FilterLink filter = "SHOW_COMPLETED" currentFilter = {visibilityFilter} onClick={onFilterClick}>COMPLETED</FilterLink>
	</p>
)



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
				<p style={{color:"grey"}}>Application Version 1: with one single component TodoApp </p>
				<p>Application Version 2: extract presentational element from the main container component </p>
				<AddTodo onAddClick = { text=>store.dispatch({
						type: "ADD_TODO",
						id: nextTodoId++,
						text
					})}
				/>
				<TodosList todos = {visibleTodos} onTodoClick = {id=>
					store.dispatch({
						type: "TOGGLE_TODO",
						id
					})}/>
				<Footer visibilityFilter= {visibilityFilter}
				 onFilterClick = {filter =>{
					 store.dispatch({
						 type: 'SET_VISIBILTY_FILTER',
						 filter
					 });
				 }}/>
      </div>
    );
  }
}

const render  = ()=>{
  ReactDOM.render(<TodoApp {...store.getState()} />, document.getElementById('root'));
	//console.log(store.getState());
}

store.subscribe(render);
render();
