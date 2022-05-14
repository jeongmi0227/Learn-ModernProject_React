import React from 'react';
import { hot } from 'react-hot-loader';
import TodoList from './todos/TodoList';
import styledComponents from 'styled-components';

const AppContainer = styledComponents.div`
    margin:1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222;
`;
const App = () => (
    <AppContainer>
        <TodoList />

    </AppContainer>
)

export default hot(module)(App);

