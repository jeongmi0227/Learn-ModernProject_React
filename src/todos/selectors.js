import { createSelector } from "reselect";
// A selector is a function that accepts Redux state as an argument and returns data that is derived from that state.
// selector can improve the performance optimizations to application and encapsulate global state tree.
// If application is growing, creating selector will be beneficial.

// Why use selectors in redux 
// reason 1) abstract away how data is stored in redux(selectors helps components be independent of exact structure of data in Redux store), 
// reason 2) give us a place to put logic to transforming redux data into data that our components can use.
// Memoization is a form of caching. It involves tracking inputs to a function, and storing the inputs and the results for later reference.
export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

// createSelector : return value of function only changes when the return value of the selectors that we pass as arguments changes.
// getImpcompleteTodos as pure function always return same result if the same arguments are passed.
export const getImpcompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted),
);

export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);

