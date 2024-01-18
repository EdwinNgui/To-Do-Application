import { configureStore } from "@reduxjs/toolkit";
import { TodoReducer } from "./reducers/TodoReducer";
import { AuthReducer } from "./reducers/AuthReducer";

//Store file with dispatching functionality located in the thunk dispatch hook
export const store = configureStore({
  reducer: {
    Todo: TodoReducer,
    Auth: AuthReducer,
  },
  devTools: true,
});
