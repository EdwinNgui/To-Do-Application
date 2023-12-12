// types.ts
import { ThunkDispatch } from "redux-thunk";
import { store } from "./store";
import { AnyAction } from "redux";

// Tip: Ensure the prop naming (task) is not the same as the interface (defined structure of objects) name 
export interface Todo {
  id: string;
  task: string; //Used to be todo (very confusing)
  completed: boolean; //Used for managing the checkbox completion
}

//Defines the structure of TodoState, as an array of Todo objects (which each have thier own id and task)
export interface TodoState {
  todos: Todo[];
}

// Tip: Ensure TodoAction Dispatches todo object as payload (for consistency and readability)
export interface TodoAction extends AnyAction {
  type: string;
  payload?: Todo;
}

//#best practices! Source: https://redux.js.org/usage/usage-with-typescript#define-root-state-and-dispatch-types
//Returns the type of the store's state to ensure state is correct: Captures entire application's structure in one type definition
export type RootState = ReturnType<typeof store.getState>;

//Handles actions tailored to Todos and ThunkDispatch
export type AppDispatch = ThunkDispatch<RootState, void, TodoAction>;
