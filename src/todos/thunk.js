import { loadTodosInProgress,loadTodoSuccess,loadTodosFailure } from "./actions";
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
export const displayAlert = text => () => {
    alert(text);
}