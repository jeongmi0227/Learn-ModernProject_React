import { expect } from 'chai';
import { todos } from '../reducers';
// Testing reducer
// reducer is pure function, in this case, we need to compare input data and expected result data. 
describe('The todos reducer', () => {
    it('Adds a new todo when CREATE_TODO action is received', () => {
        const fakeTodo = { text: 'hello', isCompleted: false };
        const fakeActon = {
            type: 'CREATE_TODO',
            payload: {
                todo: fakeTodo,
            },
        };
        const originalState = { isLoading: false, data: [] };
        const expected = {
            isLoading: false,
            data:[fakeTodo],
        }
        const actual = todos(originalState, fakeActon);
        expect(actual).to.deep.equal(expected);
    });
});