import "./App.css";
import React, { useEffect } from "react";

// Custom hooks for redux thunk made by Rahat (see './hooks/thunk')
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction, ToggleTodoAction } from "./actions/TodoActions";
import { RootState, Todo } from "./types"; // Replace with your RootState and Todo types

//Imports components for display
import TitleHeader from "./components/TitleHeader";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  useEffect(() => {
    document.title = 'Task Time';
  }, []);
  
  //Tip: Implement useRef hook rather than useState
  // => because useState manages local state (also managed in redux) and can cause re-renders
  // => where as useRef does not re-render when values change
  const dispatch = useAppDispatch();
  const Todo = useAppSelector((state: RootState) => state.Todo);
  const { todos } = Todo;

  //Calls the remove function given the t value
  const removeHandler = (t: Todo) => {
    dispatch(RemoveTodoAction(t));
  };

  //Manages the checkbox logic
  const handleCheckboxChange = (todo: Todo) => {
    dispatch(ToggleTodoAction(todo)); // Dispatches the action with the todo object
    console.log('Todo being updated:', todo);
  };

  //Handles the adding of tasks
  const addTodoHandler = (task: string) => {
    dispatch(AddTodoAction(task));
  };

  return (
    <div className="App">
      <header className="App-header">
        <TitleHeader />
        <TodoForm addTodo={addTodoHandler} />
        {todos.length > 0 && (
          <TodoList
            todos={todos}
            handleCheckboxChange={handleCheckboxChange}
            removeHandler={removeHandler}
          />
        )}
      </header>
    </div>
  );
}

export default App;
