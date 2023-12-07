import { Dispatch } from "redux";
import { RootState, Todo } from "../types";
import { AnyAction } from "redux";

// Adds the task to the array
export function AddTodoAction(task: string) {
  //returning a function for thunk for asynchrnous actions!
  //if fetching data from api make it async!
  return function (dispatch: Dispatch<AnyAction>, getState: () => RootState) {
    //get todoState from rootState! & destructure todos from todoState
    const {
      Todo: { todos },
    } = getState();

    //your each element in todos is a todo ! so todo have a property todo is reducing readability!
    //please don't use varibales like i ,j, k in projects! its a very bad practice!
    const hasTodo = todos.find((todo) => todo.task === task);

    // Checks if there is any existing in it
    if (!hasTodo && task.trim() !== "") {
      dispatch<AnyAction>({
        type: "ADD_TODO",
        //we have to create a todo object inside todos array!
        //just passing one string (or task) doesnt represent a todo!
        payload: {
          id: Math.random().toString(36).slice(2, 8),
          task,
        },
      });
    }
  };
}

// Removes the todo from the array
export function RemoveTodoAction(todo: Todo) {
  //if you are not using a parameter then pls use underscore(_) instead of it!
  return function (dispatch: Dispatch, _: () => RootState) {
    //we will always dispatch todo types as array is of type todo!
    //#best practices
    dispatch<AnyAction>({
      type: "REMOVE_TODO",
      payload: todo, // Ensure the payload is the correct todo ID
    });
  };
}
