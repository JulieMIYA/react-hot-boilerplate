import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../actionCreator'


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
            dispatch(toggleTodo(id))
        }
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



const VisibleTodoList = connect(
    mapStateToTodosListProps,
    mapDispatchToTodosListProps
)(TodosList);

export default VisibleTodoList;
