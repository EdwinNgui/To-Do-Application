// Creates the addToDo action
export const AddToDoAction = (todo) => (dispatch, getState) =>{
    dispatch({
        type: "ADD_TODO_SUCCESS",
        payload: todo,
      });
};

// Creates the remove to do action
export const RemoveToDoAction = (todo) => (dispatch, getState) =>{
    const {
        Todo: { todos },
      } = getState();
    
      dispatch({
        type: "REMOVE_TODO_SUCCESS",
        payload: todos.filter((t) => todo !== t),
      });
};
  