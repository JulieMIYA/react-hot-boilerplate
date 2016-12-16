import React ,{ Component } from 'react'
import { connect } from 'react-redux'
import { toggleTodo , fetchTodos } from '../actionCreator'
import { withRouter } from 'react-router';
import { getVisibleTodos } from '../reducers'

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
        return <TodosList {...this.props} />
  }
}

const mapStateToTodosListProps = (state, { params }) => {
    const filter = params.filter || 'all';
    return {
        todos : getVisibleTodos(state,filter),
        filter
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



VisibleTodoList = withRouter(connect(
    mapStateToTodosListProps,
    { onTodoClick: toggleTodo , fetchTodos }
)(VisibleTodoList));
//withRouter is handy when you need to read the current params somewhere deep in the component tree.
//takes a React component (TodoLists) and
//returns a different React component (VisibleTodoList)
// that injects the router-related props, such as params

export default VisibleTodoList;
