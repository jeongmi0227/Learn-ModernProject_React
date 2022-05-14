import {
    createTodo,
    removeTodo,
    completeTodo,
    loadTodosInProgress,
    loadTodoSuccess,
    loadTodosFailure
} from "./actions";
// dispatch : use to dispatch other redux actions from inside thunk.
// getState : a function that used to get access to the current state of the redux store.
export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:8080/todos-delay');
        const todos = await response.json();
        dispatch(loadTodoSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
}

export const addTodoRequest = text => async dispatch => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': "application/json",
            },
            method: 'post',
            body,
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}
export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method : 'delete'
        });
        const removedTodo = await response.json();
        dispatch(removeTodo(removedTodo));

    } catch (e) {
        dispatch(displayAlert(e));
    }
} 

export const completeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method:'post'
        });
    
        const updatedTodo = await response.json();
        dispatch(completeTodo(updatedTodo));

    } catch (e) {
        dispatch(displayAlert(e));
    }
}
export const displayAlert = text => () => {
    alert(text);
}