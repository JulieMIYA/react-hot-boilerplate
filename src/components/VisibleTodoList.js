import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actionCreator'
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers'

const mapStateToTodosListProps = (state, {params}) => {
    return {
        todos : getVisibleTodos(
            state,
            params.filter || 'all'
        )
    };
};


const Todo = ({onClick, completed, text})=>(
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



const VisibleTodoList = withRouter(connect(
    mapStateToTodosListProps,
    { onTodoClick: toggleTodo }
)(TodosList));
//withRouter is handy when you need to read the current params somewhere deep in the component tree.
//takes a React component (TodoLists) and
//returns a different React component (VisibleTodoList)
// that injects the router-related props, such as params

export default VisibleTodoList;
