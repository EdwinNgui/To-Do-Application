// types.ts
import { ThunkDispatch } from "redux-thunk";
import { store } from "./store";
import { AnyAction } from "redux";

//set task because todo prop inside todo creates confusion!!
export interface Todo {
  id: string;
  task: string;
}

export interface TodoState {
  todos: Todo[];
}

//we will always dispatch a todo object from pur actions as payload!
//instead of dispatching random things for every action!
//it will reduce confusion and increase readability!
export interface TodoAction extends AnyAction {
  type: string;
  payload?: Todo;
}

//#best practices! Source: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, void, TodoAction>;
