import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { combineReducers } from 'redux';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

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
/*----------------- define components -----------------*/
let AddTodo =  ({d})=>{
		let inputEle;
		return (
			<div>
				<input ref={node=>{inputEle = node; }}/>
				<button onClick= {
					()=>{
						if(inputEle.value!=="")
						{
							d({
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
AddTodo = connect(null, (d) => {
    return { d };
  })(AddTodo);


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

const mapStateToTodosListProps = (state) => {
	return {
		todos : getVisibileTodos(
			state.todos,
			state.visibilityFilter
		)
	};
};
const mapDispatchToTodosListProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
        dispatch({
        type: 'TOGGLE_TODO',
        id
      })
    }
  };
};
const VisibleTodoList = connect(
  mapStateToTodosListProps,
  mapDispatchToTodosListProps
)(TodosList);

const mapStateToFilterProps = (state, ownProps) => {
	return {
		active : ownProps.filter === state.visibilityFilter
	}
};
const mapDispatchToFilterProps = (dispatch, ownProps)=> {
	return {
		onClick : ()=>{
			dispatch({
				type: 'SET_VISIBILTY_FILTER',
				filter: ownProps.filter
			});
		}
	}
};

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

const FilterLink = connect(mapStateToFilterProps, mapDispatchToFilterProps)(Link);
// except for the props from mapStateToFilterProps and mapDispatchToFilterProps , link will get all the props FilterLink has, like children !!!!!!
// class FilterLink extends Component {
// 	componentDidMount(){
// 		const {store} = this.context;
// 		this.unsubscribe  = store.subscribe(()=>{
// 			this.forceUpdate();
// 		});
// 	}
// 	componentWillUnmount(){
// 		this.unsubscribe();
// 	}
// 	render(){
// 		const props = this.props;
// 		const {store}= this.context;
// 		const state = store.getState();
// 		return (
// 			<Link
// 				active= {props.filter === state.visibilityFilter}
// 				onClick = {()=>{
// 					store.dispatch({
// 						type: 'SET_VISIBILTY_FILTER',
// 						filter: props.filter
// 					});
// 				}} >{props.children}</Link>
// 		);
// 	}
// }
// FilterLink.contextTypes = {
//   store: React.PropTypes.object
// };

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


let nextTodoId = 0;

const TodoApp = ()=>(
	<div>
		<p style={{color:"grey"}}>Application Version 1: with one single component TodoApp </p>
		<p style={{color:"grey"}}>Application Version 2: extract presentational element from the main container component </p>
		<p style={{color:"grey"}}>Application Version 3: seperate presentational and container component, container component subscribe to the store for being updated whenever the state change,
		it loads the data and specifies the behavior for realted presentational component </p>
		<p style={{color:"grey"}}>Application Version 4: Using React's Context ,the context essentially allows store as a global variable across the
		component tree in any deepth. So we don't need to pass 'store' to every nodes(even the presentational node which don't use the store variable) by props.
		The container component could get access to 'context' directly in any deepth as the childContextTypes are specified. </p>
		<p style={{color:"grey"}}>App version 5, remove the declaration of original Provider, use Provider from React_redux Lib </p>
		<p >App version 6, use connect() function from React_redux Lib, avoiding using context and subscribe/ unsubscribe to store in Components, cause connect() will handle it automatically </p>

		<AddTodo/>
		<VisibleTodoList />
		<Footer/>
	</div>
);


/*----------------- define store with passing root reducer--------------
const store = createStore(todoApp);
*/
/*
class Provider extends Component{
	//with deinfing getChildContext FUN(), this store will be part of the context that the Provider specifies for any of its children and grandchildren.
	getChildContext(){
		return {
			store: this.props.store
		};
	}
	render() {
    return this.props.children;
  }
}
Provider.childContextTypes = {
	 store: React.PropTypes.object
 }; // define the contexttype which will be passed down
*/

ReactDOM.render(
	<Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>, document.getElementById('root'));
