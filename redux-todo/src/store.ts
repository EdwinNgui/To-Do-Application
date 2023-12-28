import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

//Store file with dispatching functionality located in the thunk dispatch hook
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
