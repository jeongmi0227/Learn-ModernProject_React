import {
    CREATE_TODO,
    REMOVE_TODO,
    COMPLETE_TODO,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
    LOAD_TODOS_FAILURE,
} from './actions.js';


const initialState = { isLoading: false, data: [] };

// reducers take two arguments state, action 
export const todos = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type){
        case CREATE_TODO: {
            const { todo } = payload;
            return {
                ...state,
                data: state.data.concat(todo),
            };
        }
        case REMOVE_TODO: {
            const { todo:todoToRemove } = payload;
            return {
                ...state,
                datat: state.data.filter(todo => todo.id !== todoToRemove.id),
            }
        }
        case COMPLETE_TODO: {
            const { todo:updatedTodo } = payload;
           
            return {
                ...state,
                data: state.data.map(todo => {
                    if (todo.id === updatedTodo.id) {
                        return updatedTodo;
                    }
                    return todo;
                }),
            };
        }
        case LOAD_TODOS_SUCCESS: {
            const { todos } = payload;
            return {
                ...state,
                isLoading:false,
                data:todos,
            }
        }
        case LOAD_TODOS_IN_PROGRESS: 
            return {
                ...state,
                isLoading:true,
            }
        case LOAD_TODOS_FAILURE: 
            return {
                ...state,
                isLoading:false,
            }
        default:
            return state;
    }
}