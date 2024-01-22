import { Todo } from "./../types/Todo.Types";
import { Dispatch } from "redux";
import { RootState } from "../types/Root.Types";
import { AnyAction } from "redux";
import axios from "axios";

// Adds the user-inputted task to the array
export function AddTodoAction(task: string) {
  return function (dispatch: Dispatch<AnyAction>, getState: () => RootState) {
    const {
      Todo: { todos },
    } = getState();

    const hasTodo = todos.find((todo: Todo) => todo.task === task);

    if (!hasTodo && task.trim() !== "") {
      const newTodo = {
        task,
        completed: false,
      };

      axios
        .post("http://localhost:80/v1/todos", newTodo, {
          withCredentials: true,
        })
        .then((response) => {
          // If the request is successful, dispatch the action
          dispatch<AnyAction>({
            type: "ADD_TODO",
            payload: {
              ...newTodo,
              _id: response.data.todoId,
            },
          });
        })
        .catch((error) => {
          // Handle the error
          console.error(error);
        });
    }
  };
}

// Removes the todo from the array
export function RemoveTodoAction(todo: Todo) {
  return function (dispatch: Dispatch, _: () => RootState) {
    axios
      .delete(`http://localhost:80/v1/todos/${todo._id}`, {
        withCredentials: true,
      })
      .then((response) => {
        // If the request is successful, dispatch the action
        dispatch<AnyAction>({
          type: "REMOVE_TODO",
          payload: todo,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
}

//Toggles the checkbox for each task
export function ToggleTodoAction(todo: Todo) {
  return function (dispatch: Dispatch, _: () => RootState) {
    const updatedTodo = { ...todo, completed: !todo.completed };

    axios
      .put(`http://localhost:80/v1/todos/${todo._id}`, updatedTodo, {
        withCredentials: true,
      })
      .then((response) => {
        // If the request is successful, dispatch the action
        dispatch({
          type: "TOGGLE_TODO",
          payload: updatedTodo,
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
}

export function PopulateTodoAction() {
  return function (dispatch: Dispatch, _: () => RootState) {
    axios
      .get("http://localhost:80/v1/todos", {
        withCredentials: true,
      })
      .then((response) => {
        // If the request is successful, dispatch the action
        dispatch({
          type: "POPULATE_TODOS",
          payload: response.data as Todo[], // assuming the response data is an array of todos
        });
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  };
}
