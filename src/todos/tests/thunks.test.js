import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadTodos } from '../thunks';


// Testing thunk 
// 1) Make sure that thunk dispatches the correct actions at the right times.
// 2) Make sure that it makes the correct external requests.

// sinon package is to create a fake function that we can pass in that keeps track of what arguments it was called with.
describe('The loadTodos thunk', () => {
    it('Dispatches the correct actions in the success scenario', async () => {
        const fakeDispatch = sinon.spy(); 

        // matching stucture of todos is not mandatory
        const fakeTodos = [{ text: '1' }, { text: '2' }];
        // thunk try to use fetch to request get todos it will return faketodos instead of acutal todos.
        fetchMock.get('http://localhost:8080/todos', fakeTodos);

        const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS' };
        const expectedSecondAction = {
            type: 'LOAD_TODOS_SUCCESS',
            payload: {
                todos:fakeTodos,
            },
        };

        // calling thunk 
        await loadTodos()(fakeDispatch);
        // getGall(0) is referring to the first call that was made to our fakeDispatch
        // args[0] is referrring to the first argument that was passed during the first call to fakeDispatch
        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);
        
        // restore fetch to its original state
        fetchMock.reset();
    });
});