import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from './actions.js';
import './NewTodoForm.css';


const NewTodoForm = ({todos,onCreatePressed}) => {
    const [inputValue, setInputValue] = useState('');

    return (
        <div className='new-todo-form'>
            <input className='new-todo-input' 
                type='text'
                placeholder='Type your new todo here'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)} />
            <button
                onClick={() => {
                    const isDuplicateText =
                        todos.some(todo => todo.text === inputValue);
                    if (!isDuplicateText) {
                        onCreatePressed(inputValue);
                        setInputValue('');
                    }
                }}
                className='new-todo-button'> Create Todo</button>
        </div >
        );
};
//mapStateToProps : take this state object and return another object containing the pieces
// of that state that our component needs access to.
const mapStateToProps = state => ({
    todos:state.todos,
});
//mapDispatchToProps : 
// dispatch : allow our function to trigger actions that our redux store will respond to.
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(createTodo(text)),
});

//export connected component we defined.
export default connect(mapStateToProps,mapDispatchToProps)(NewTodoForm);