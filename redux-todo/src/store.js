import { configureStore } from '@reduxjs/toolkit';
import {TodoReducers} from './reducers/TodoReducers';
import thunk from 'redux-thunk';

const middleware = [thunk];

//Our store is Todo (it's where everything goes)
const store = configureStore({
  reducer: {
    Todo: TodoReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware),
  devTools: true
});

export default store;
