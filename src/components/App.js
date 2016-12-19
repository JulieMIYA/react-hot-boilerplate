import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 16: Remove promise, use thunk instead
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;