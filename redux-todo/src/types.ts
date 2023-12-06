// types.ts
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export interface Todo {
  id: string;
  todo: string;
}

export interface RootState {
  Todo: TodoState;
}

export interface TodoState {
  todos: Todo[];
}

export type TodoAction =
  | { type: "ADD_TODO"; payload: string }
  | { type: "REMOVE_TODO"; payload: string };

export type DispatchType = ThunkDispatch<RootState, void, AnyAction>;
