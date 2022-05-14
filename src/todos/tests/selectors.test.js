import { expect } from 'chai';
import { getCompletedTodos } from '../selectors';
// resultFunc is a reference to the last function that we passed to createSelector 
describe('The getCompletedTodos selector', () => {
    it('Returns only completed todos', () => {
        const fakeTodos = [{
            text: 'Say Hello',
            isCompleted: true,
        }, {
            text: 'Say Good bye',
            isCompleted: false,
        }, {
            text: 'Skating',
            isCompleted: false,
        }];
        const expected = [{
            text: 'Say Hello',
            isCompleted: true,
        }];

        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    });
});
