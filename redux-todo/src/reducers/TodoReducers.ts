import { Reducer } from "redux";
import { TodoAction, TodoState } from "./../types";

export const TodoReducers: Reducer<TodoState, TodoAction> = (
  state = { todos: [] },
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload) {
        const addedTodos = [...state.todos, action.payload];
        return { todos: addedTodos };
      }
      return state;

    case "REMOVE_TODO":
      if (action.payload) {
        const todoToRemove = action.payload;
        const updatedTodos = state.todos.filter(
          (todo) => todo.id !== todoToRemove.id
        );
        return { todos: updatedTodos };
      }
      return state;

    default:
      return state;
  }
};
