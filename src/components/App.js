import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 13: Use Middleware :
            Middleware is a powerful system that lets us put custom behavior before action
            reaches the reducers. People use middleware for different purposes, such as
            login, analytics, error-handling, asynchronous counterflow, and more.
            The purpose of the middlewares is to replace the single dispatch function with
            a chain of composable dispatch functions which each can do something with an action.
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;