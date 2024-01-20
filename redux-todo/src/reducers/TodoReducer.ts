import { Reducer } from "redux";
import { Todo, TodoAction, TodoState } from "../types/Todo.Types";

//we will always dispatch a todo object from pur actions as payload!
//no more changes
export const TodoReducer: Reducer<TodoState, TodoAction> = (
  state = { todos: [] },
  action
) => {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload) {
        const addedTodos = [...state.todos, action.payload as Todo];
        return { todos: addedTodos };
      }
      return state;

    case "REMOVE_TODO":
      if (action.payload) {
        const todoToRemove = action.payload as Todo;
        const updatedTodos = state.todos.filter(
          (todo) => todo._id !== (todoToRemove as Todo)._id
        );
        return { todos: updatedTodos };
      }
      return state;

    case "TOGGLE_TODO":
      if (action.payload) {
        const toggledTodo = action.payload;
        const updatedTodos = state.todos.map((todo) =>
          todo._id === (toggledTodo as Todo)._id
            ? { ...todo, completed: !todo.completed }
            : todo
        );
        return { todos: updatedTodos };
      }
      return state; // Return the current state if payload is undefined or incorrect type
    case "POPULATE_TODOS":
      const todos = [...(action.payload as Todo[])];
      return { todos };
    default:
      return state;
  }
};
