import { configureStore } from "@reduxjs/toolkit";
import { TodoReducers } from "./reducers/TodoReducers";

export const store = configureStore({
  reducer: {
    Todo: TodoReducers,
  },
  devTools: true,
});
