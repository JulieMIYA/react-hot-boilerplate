import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 10: To normalize
            the state shape to ensure data consistency
            that is important in real-world applications.
            <br/>To treat my state as a database, to keep 'todos' in an object (rather than an array)
            indexed by the IDs of the todos
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;