import { Dispatch } from 'redux';
import { RootState } from '../types';
import { AnyAction } from 'redux';

// Adds the task to the array
export const AddTodoAction = (todo: string) => (dispatch: Dispatch<AnyAction>, getState: () => RootState) => {
  const {
    Todo: { todos },
  } = getState();

  const hasTodo = todos.find((i) => i.todo === todo);

  // Checks if there is any existing in it
  if (!hasTodo && todo.trim() !== '') {
    dispatch<AnyAction>({
      type: "ADD_TODO",
      // payload: { id: todo, todo } // Sends the payload as a single todo object
      payload: todo, //Accepts the todo instead of id todo todo
    });
  }
};

// Removes the task from the array
export const RemoveTodoAction = (todoId: string) => (dispatch: Dispatch, getState: () => RootState) => {
  dispatch<AnyAction>({
    type: "REMOVE_TODO",
    payload: todoId, // Ensure the payload is the correct todo ID
  });
};

