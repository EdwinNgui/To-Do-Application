import { configureStore } from '@reduxjs/toolkit';
import { TodoReducers } from './reducers/TodoReducers';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { RootState, TodoAction } from './types'; // Replace with your RootState and TodoAction types

const store = configureStore({
  reducer: {
    Todo: TodoReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware<ThunkMiddleware<RootState, TodoAction>>({
      serializableCheck: false,
    }).prepend(thunk as ThunkMiddleware<RootState, TodoAction>),
  devTools: true,
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import {TodoReducers} from './reducers/TodoReducers';
// import thunk, { ThunkMiddleware } from 'redux-thunk';
// import { RootState, TodoAction } from './types';

// //Imports middleware
// const middleware = [thunk as ThunkMiddleware< RootState, TodoAction >];

// //Our store is Todo (it's where everything goes)
// const store = configureStore({
//   reducer: {
//     Todo: TodoReducers
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware< RootState, TodoAction >().concat(...middleware),
//   devTools: true
// });

// export default store;


