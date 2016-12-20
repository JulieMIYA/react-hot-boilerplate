import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo , fetchTodos  } from '../actions'
import { withRouter } from 'react-router';
import { getVisibleTodos , getIsFetching , getErrorMessage } from '../reducers'
import FetchError from './FetchError'

class VisibleTodoList extends Component {
    fetchData() {
        const { filter, fetchTodos } = this.props;
        fetchTodos(filter);
    }
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate(prevProps) {
        if (this.props.filter !== prevProps.filter) {
            this.fetchData();
        }
    }
    render() {
        const { isFetching, todos, errorMessage, onTodoClick } = this.props;
        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }
        if (errorMessage && !todos.length){
            return(
                <FetchError
                    message = { errorMessage }
                    onRetry = {()=>this.fetchData()}
                />
            )
        }
        return (
            <TodosList
                todos= { todos }
                onTodoClick= {onTodoClick} />
        )
    }
}

const mapStateToTodosListProps = ( state , { params }) => {
    const filter = params.filter || 'all';
    return {
        todos : getVisibleTodos(state,filter),
        errorMessage : getErrorMessage(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    };
};


const Todo = ({onClick, completed, text})=>(
    <li onClick={ onClick }
        style= {{ textDecoration: completed ? 'line-through': 'none'}}>
        {text}
    </li>
);

const TodosList = ({todos, onTodoClick}) => {
    return (
        <ul>
            {todos.map(todo =>(
                <Todo
                    key={todo.id} {...todo} onClick = {()=>onTodoClick(todo.id)
                } />
            ))}
        </ul>
    )
}


VisibleTodoList = withRouter(connect(
    mapStateToTodosListProps,
    { onTodoClick: toggleTodo , fetchTodos }
)(VisibleTodoList));
//withRouter is handy when you need to read the current params somewhere deep in the component tree.
//takes a React component (TodoLists) and
//returns a different React component (VisibleTodoList)
// that injects the router-related props, such as params

export default VisibleTodoList;
