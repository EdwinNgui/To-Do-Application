// Adds the task to the array
export const AddTodoAction = (todo) => (dispatch, getState) => {
  const {
    Todo: { todos },
  } = getState();

  const hasTodo = todos.find((i) => i.todo === todo);

  // Checks if there is any existing in it
  if (!hasTodo && todo !== '') {
    dispatch({
      type: "ADD_TODO",
      payload: { id: todo, todo } // Sends the payload as a single todo object
    });
  }
};

// Removes the task from the array
export const RemoveTodoAction = (todoId) => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_TODO",
    payload: todoId, // Ensure the payload is the correct todo ID
  });
};

