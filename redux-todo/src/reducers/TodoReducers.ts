import { Reducer } from "redux";
import { TodoAction, TodoState } from "./../types";

//we will always dispatch a todo object from pur actions as payload!
//no more changes
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
    
      case "TOGGLE_TODO":
        if (action.payload) {
          const toggledTodo = action.payload;
          const updatedTodos = state.todos.map(todo =>
            todo.id === toggledTodo.id ? { ...todo, completed: !todo.completed } : todo
          );
          return { todos: updatedTodos };
        }
        return state; // Return the current state if payload is undefined or incorrect type
      

    default:
      return state;
  }
};
