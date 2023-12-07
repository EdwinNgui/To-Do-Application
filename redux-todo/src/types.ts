// types.ts
import { ThunkDispatch } from "redux-thunk";
import { store } from "./store";
import { AnyAction } from "redux";

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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = ThunkDispatch<RootState, void, TodoAction>;
