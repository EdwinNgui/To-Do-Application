import { AnyAction } from "redux";

///////////////////////TODO-TYPES////////////////

// Tip: Ensure the prop naming (task) is not the same as the interface (defined structure of objects) name
export interface Todo {
  _id: string;
  task: string; //Used to be todo (very confusing)
  completed: boolean; //Used for managing the checkbox completion
}

//Defines the structure of TodoState, as an array of Todo objects (which each have thier own id and task)
//Will be only used in the reducer
export interface TodoState {
  todos: Todo[];
}

// Tip: Ensure TodoAction Dispatches todo object as payload (for consistency and readability)
export interface TodoAction extends AnyAction {
  type: string;
  payload?: Todo | Todo[];
}
