import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import './TodoList.css';
import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getImpcompleteTodos,
} from './selectors';
import { completeTodoRequest, loadTodos,removeTodoRequest } from './thunks.js';

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading,startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    },[]);
    const loadingMessage = <div>Loading Todos...</div>;
    const content = (
        <div className="list-wrapper">
            <NewTodoForm />
            <h3>Incomplete</h3>
            {incompleteTodos.map((todo, index) => <TodoListItem key={index} todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed} />)}
            <h3>completed:</h3>
            {completedTodos.map((todo, index) => <TodoListItem key={index} todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletedPressed={onCompletedPressed} />)}
        </div>
    );
    return isLoading ? loadingMessage : content;
};
// The mapStateToProps() method is used to render the stored data to the component. allow the component to access information in the global Redux store. 
const mapStateToProps = state => ({
    isLoading:getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos:getImpcompleteTodos(state),
});

// The mapDispatchToProps() method is used to render the action creators with props to the component. allow the component to update the global Redux store.
const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(completeTodoRequest(id)),
});

// (null,mapDispatchToProps)TodoList
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);

// Redux best Practices 
// 1. Having two versions of the export 1) disconnect the redux-storage 2) connect to the redux-storage
// 2. Keep redux actions and async operations out of your reducers. reducers take current state of the component and take the action compare if it is needed to be updated or not.
// 3. Think carefully about connectiong components ( connectiong a component can, in practice, make it less reusable )
// if we want to reuse the components with different data it is better not to connect this component to store
