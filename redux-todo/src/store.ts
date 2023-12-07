import { configureStore } from "@reduxjs/toolkit";
import { TodoReducers } from "./reducers/TodoReducers";

//dont need to setup thunk as my thunk dispatch hook can handle it!
export const store = configureStore({
  reducer: {
    Todo: TodoReducers,
  },
  devTools: true,
});
