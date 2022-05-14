import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import { getTodos } from './selectors';
import styledComponents from 'styled-components';

const FormContainer = styledComponents.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;
const NewTodoInput = styledComponents.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styledComponents.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;
const NewTodoForm = ({todos,onCreatePressed}) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <FormContainer>
            <NewTodoInput 
                type='text'
                placeholder='Type your new todo here'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <NewTodoButton
                onClick={() => {
                    const isDuplicateText =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                > Create Todo</NewTodoButton>
        </FormContainer >
        );
};
//mapStateToProps : take this state object and return another object containing the pieces
// of that state that our component needs access to.
const mapStateToProps = state => ({
    todos:getTodos(state),
});
//mapDispatchToProps : 
// dispatch : allow our function to trigger actions that our redux store will respond to.
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

//export connected component we defined.
export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm);