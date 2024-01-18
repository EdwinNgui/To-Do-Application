// types.ts
import { ThunkDispatch } from "redux-thunk";
import { TodoAction } from "./Todo.Types";
import { AuthAction } from "./Auth.Types";
import { store } from "../store";

//#best practices! Source: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
//Returns the type of the store's state to ensure state is correct: Captures entire application's structure in one type definition
export type RootState = ReturnType<typeof store.getState>;

//Handles actions tailored to Todos and ThunkDispatch
type rootAction = TodoAction | AuthAction;

export type AppDispatch = ThunkDispatch<RootState, void, rootAction>;
