import React from 'react';
import { connect } from 'react-redux';
import { removeTodo,completeTodo } from './actions.js';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';

const TodoList = ({todos =[],onRemovePressed,onCompletedPressed}) => (
    <div className="list-wrapper">
        <NewTodoForm />
        {todos.map((todo,index) => <TodoListItem key={index} todo={todo} 
            onRemovePressed={onRemovePressed}
            onCompletedPressed={onCompletedPressed} />)}
        
    </div>   
)
const mapStateToProps = state => ({
    todos: state.todos,
});
const mapDispatchToProps = dispatch => ({
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed:text=>dispatch(completeTodo(text)),
});

// (null,mapDispatchToProps)TodoList
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

// Redux best Practices 
// 1. Having two versions of the export 1) disconnect the redux-storage 2) connect to the redux-storage
// 2. Keep redux actions and async operations out of your reducers. reducers take current state of the component and take the action compare if it is needed to be updated or not.
// 3. Think carefully about connectiong components ( connectiong a component can, in practice, make it less reusable )
// if we want to reuse the components with different data it is better not to connect this component to store
