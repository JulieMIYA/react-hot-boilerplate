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
const AddTodo = ()=>{
		let inputEle;
		return (
			<div>
				<input ref={node=>{inputEle = node; }}/>
				<button onClick= {
					()=>{
						if(inputEle.value!=="")
						{
							store.dispatch({
									type: "ADD_TODO",
									id: nextTodoId++,
									text: inputEle.value
								})
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

const TodosList = ({todos, onTodoClick}) =>(
	<ul>
		{todos.map(todo =>(
			<Todo
				key={todo.id} {...todo} onClick = {()=>onTodoClick(todo.id)
				} />
		))}
	</ul>
);
class VisibleTodoList extends Component{
	componentDidMount(){
		this.unsubscribe  = store.subscribe(()=>{
			this.forceUpdate();
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render(){
		const state = store.getState();
		return(
			<TodosList
				todos = {getVisibileTodos(state.todos, state.visibilityFilter)}
				onTodoClick = {(id)=>{
					store.dispatch({
						type: "TOGGLE_TODO",
						id
					})
				}}
			/>
		)
	}
}
const Link = ({active, children, onClick}) =>{
	if(active) return (<span>{children}</span>);
	return (
		<a href ="#"
			onClick= { e=>{
				e.preventDefault();
				onClick();
			}} >
		{children}
		</a>
	);
}

class FilterLink extends Component {
	//for ths moment , we rerender the whole application whenever the state of the store change, but it's not efficient.
	//the method below force this component updated when the store's state change
	componentDidMount(){
		this.unsubscribe  = store.subscribe(()=>{
			this.forceUpdate();
		});
	}
	componentWillUnmount(){
		this.unsubscribe();
	}
	render(){
		const props = this.props;
		const state = store.getState();
		return (
			<Link
				active = {props.filter===state.visibilityFilter}
				onClick = {()=>{
					store.dispatch({
						type: 'SET_VISIBILTY_FILTER',
						filter: props.filter
					});
				}}>{props.children}</Link>
		);
	}
}
const Footer =({})=>(
	<p>
		Show :
		{' '}
		<FilterLink filter = "SHOW_ALL" >ALL</FilterLink>
		{' '}
		<FilterLink filter = "SHOW_ACTIVE">ACTIVE</FilterLink>
		{' '}
		<FilterLink filter = "SHOW_COMPLETED">COMPLETED</FilterLink>
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
const TodoApp = ()=>(
	<div>
		<p style={{color:"grey"}}>Application Version 1: with one single component TodoApp </p>
		<p style={{color:"grey"}}>Application Version 2: extract presentational element from the main container component </p>
		<p >Application Version 3: seperate presentational and container component, container component subscribe to the store for being updated whenever the state change,
		it loads the data and specifies the behavior for realted presentational component </p>
		<AddTodo/>
		<VisibleTodoList />
		<Footer/>
	</div>
);


ReactDOM.render(<TodoApp />, document.getElementById('root'));
