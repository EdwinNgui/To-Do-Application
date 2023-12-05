// Defines the structure for the state object to use; array of strings
interface TodoState {
  todos: string[];
}

// States what type each action is going to use
type TodoAction = 
  | { type: "ADD_TODO"; payload: string}
  | { type: "REMOVE_TODO"; payload: number}
  //ISSUE: might need to payload number for indexing or string for id

//Sends applies the action based on the case (add/remove)
//Specifies parameters and their types
export const TodoReducers = (state: TodoState = { todos: [] }, action: TodoAction): TodoState => {
  switch (action.type) {
    case "ADD_TODO":
      const addedTodos = [...state.todos, action.payload];
      return { todos: addedTodos };
    
    case "REMOVE_TODO":
      const todoIdToRemove = action.payload.toString(); // Ensure payload is a string
      const updatedTodos = state.todos.filter((todo) => todo !== todoIdToRemove);
      // console.log("Updated Todos after REMOVE_TODO:", updatedTodos); // Was for bug testing
      return { todos: updatedTodos };
    
    default:
      return state;
  }
};
