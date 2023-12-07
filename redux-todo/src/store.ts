import { configureStore } from "@reduxjs/toolkit";
import { TodoReducers } from "./reducers/TodoReducers";

//Store file with dispatching functionality located in the thunk dispatch hook
export const store = configureStore({
  reducer: {
    Todo: TodoReducers,
  },
  devTools: true,
});
