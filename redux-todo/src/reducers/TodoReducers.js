//Sends applies the action based on the case (add/remove)
export const TodoReducers = (state = { todos: [] }, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const addedTodos = [...state.todos, action.payload];
      return { todos: addedTodos };
    
    case "REMOVE_TODO":
      const todoIdToRemove = action.payload.toString(); // Ensure payload is a string
      const updatedTodos = state.todos.filter(todo => todo.id.toString() !== todoIdToRemove);
      // console.log("Updated Todos after REMOVE_TODO:", updatedTodos); // Was for bug testing
      return { todos: updatedTodos };
    
    default:
      return state;
  }
};
