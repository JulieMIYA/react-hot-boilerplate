import React from 'react'

//import components
import Footer from './Footer'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'

const App = ({ params })=>(
    <div>
        <p>App version 18: Use normalizer to normalize API responses to have the same shape , 
        </p>
        <AddTodo/>
        <VisibleTodoList />
        <Footer/>
    </div>
);
export default App;