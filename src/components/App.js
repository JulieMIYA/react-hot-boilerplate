import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 12: Add asynchronous action creator, by the way, override the dispatch
            function to accept a promise of action.(By default, the dispatch() only allow
            a plain object as an action rather than a promise of action
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;