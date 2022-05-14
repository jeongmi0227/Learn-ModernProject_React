import React from 'react';
import styledComponents from 'styled-components';
// styled-components allows to build custom components
const TodoItemContainer = styledComponents.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const TodoItemCotainerWithWarning = styledComponents(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 8640000 * 5)
        ? 'none'
        : '2px solid red')};
`;
const ButtonsContainer = styledComponents.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;
const Button = styledComponents.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    display: inline-block;
`;
// extends the default Button
const CompletedButton = styledComponents(Button)`
    background-color: #22ee22;
`;

const RemoveButton = styledComponents(Button)`
    background-color: #ee2222;
    margin-left: 8px;
`;
const TodoListItem = ({ todo, onRemovePressed, onCompletedPressed }) => {

    const Container = todo.isCompleted ? TodoItemContainer : TodoItemCotainerWithWarning;
    return (
        <Container createdAt={todo.createdAt}>
            <h3>{todo.text}</h3>
            <p>
                Create at:&nbsp;
                {(new Date(todo.createdAt)).toLocaleDateString()}
            </p>
            <ButtonsContainer>
                {todo.isCompleted ? null :
                    <CompletedButton
                        onClick={() => onCompletedPressed(todo.id)}> Mark as Completed</CompletedButton>}
                <RemoveButton
                    onClick={() => onRemovePressed(todo.id)}>Remove</RemoveButton>
            </ButtonsContainer>
        </Container>
    )
}
export default TodoListItem; 