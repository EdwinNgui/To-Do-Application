//Contains all reducers: The rootReducer and authReducer

import { combineReducers, Reducer } from 'redux';
import { TodoState } from '../types/todoTypes';
import { AuthState } from '../types/authTypes';
import { TodoReducers } from './TodoReducers'; // Import your TodoReducers
import authReducers from './authReducer'; // Import your AuthReducers

const rootReducer = combineReducers({
  todo: TodoReducers as Reducer<TodoState>,
  auth: authReducers as Reducer<AuthState>,
});

export default rootReducer;
