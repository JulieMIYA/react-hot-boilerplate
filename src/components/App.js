import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 19: Dispatch toggle_todo
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;