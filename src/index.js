import ReactDOM from 'react-dom';
import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

//import components
import Footer from './components/Footer'
import AddTodo from './components/AddTodo'
import VisibleTodoList from './components/VisibleTodoList'

//import rootreducer
import todoApp from './reducers/rootReducer'


const TodoApp = ()=>(
	<div>
		<p style={{color:"grey"}}>Application Version 1: with one single component TodoApp </p>
		<p style={{color:"grey"}}>Application Version 2: extract presentational element from the main container component </p>
		<p style={{color:"grey"}}>Application Version 3: seperate presentational and container component, container component subscribe to the store for being updated whenever the state change,
		it loads the data and specifies the behavior for realted presentational component </p>
		<p style={{color:"grey"}}>Application Version 4: Using React's Context ,the context essentially allows store as a global variable across the
		component tree in any deepth. So we don't need to pass 'store' to every nodes(even the presentational node which don't use the store variable) by props.
		The container component could get access to 'context' directly in any deepth as the childContextTypes are specified. </p>
		<p style={{color:"grey"}}>Application version 5, remove the declaration of original Provider, use Provider from React_redux Lib </p>
		<p style={{color:"grey"}}>Application version 6, use connect() function from React_redux Lib, avoiding using context and subscribe/ unsubscribe to store in Components, cause connect() will handle it automatically </p>
		<p style={{color:"grey"}}>App version 7: Extract Action Creators, which tell your team what kinds of actions the components can dispatch, and this kind of information can be invaluable in large applications.</p>
		<p>App version 8:  Extract different of the code in index.js into: Reducer, Component, and ActionCreator</p>

		<AddTodo/>
		<VisibleTodoList/>
		<Footer/>
	</div>
);


ReactDOM.render(
	//expose store to TodoApp Component
	<Provider store={createStore(todoApp)}>
    	<TodoApp />
  	</Provider>, document.getElementById('root'));
