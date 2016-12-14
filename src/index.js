import ReactDOM from 'react-dom';
import React from 'react';
import Root from './components/Root';
import configureStore from './configureStore';


const store = configureStore();
ReactDOM.render(
	//expose store to TodoApp Component
	<Root store={ store }></Root>, document.getElementById('root'));
