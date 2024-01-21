import { Dispatch } from "redux";
import { RootState, Todo } from "../types/todoTypes";
import { AnyAction } from "redux";

// Adds the user-inputted task to the array
export function AddTodoAction(task: string) {
  //Returning a function for thunk for asynchrnous actions!
  //Tip: if fetching data from api make it async!
  //USE REACT QUERY THROUGH THUNK by returning aynsc action functions
  return function (dispatch: Dispatch<AnyAction>, getState: () => RootState) {
    
    //get todoState from rootState & destructure todos from RootState (formerly from todoState but we have two stores and reducers)
    const { todo }: RootState = getState(); // Destructure 'todo' directly

    // Each element in todos (stores the tasks) is a todo (task object): Has property of id and task
    //Tip: Do not reuse variable names; makes it hard to read => Instead use descriptive variable names
    const hasTodo = todo.todos.find((todoItem) => todoItem.task === task);

    // Checks if there is any existing in it
    if (!hasTodo && task.trim() !== "") {
      dispatch<AnyAction>({
        type: "ADD_TODO",
        //we have to create a todo object inside todos array!
        //just passing one string (or task) doesnt represent a todo!

        //Payload: Creates a random id, uses the processed task and sets completed initially to false
        payload: {
          id: Math.random().toString(36).slice(2, 8),
          task,
          completed: false,
        },
      });
    }
  };
}

// Removes the todo from the array
export function RemoveTodoAction(todo: Todo) {
  // _ represents a placeholder for the parameter
  //RootState needed dispatch of type Dispatch and _ of type ()
  return function (dispatch: Dispatch, _: () => RootState) {
    // Dispatches todo types as array of type todo (keeps consistency for best practices)
    dispatch<AnyAction>({
      type: "REMOVE_TODO",
      payload: todo, // Ensure the payload is the correct todo ID
    });
  };
}

//Toggles the checkbox for each task
export function ToggleTodoAction(todo: Todo) {
  return function (dispatch: Dispatch, _: () => RootState) {
    dispatch({
      type: "TOGGLE_TODO",
      //Returns modified todo with the completion toggled
      payload: { ...todo, completed: !todo.completed },
    });
  };
}
