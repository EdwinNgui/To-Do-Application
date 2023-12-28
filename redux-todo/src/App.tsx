import "./App.css";
import React, { useEffect, useState } from "react";

// Custom hooks for redux thunk made by Rahat (see './hooks/thunk')
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction, ToggleTodoAction } from "./actions/TodoActions";
import { RootState, Todo } from "./types/todoTypes"; // Replace with your RootState and Todo types
import { AuthState } from "./types/authTypes";

//Imports components for display
import TitleHeader from "./components/TitleHeader";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import AuthContainer from "./components/AuthContainer";

function App() {
  //Tip: Implement useRef hook rather than useState
  // => because useState manages local state (also managed in redux) and can cause re-renders
  // => where as useRef does not re-render when values change
  const dispatch = useAppDispatch();
  const Todo = useAppSelector((state: RootState) => state.todo);
  const { todos } = Todo;

  const authState: { isLoggedIn: boolean } = useAppSelector((state: RootState) => state.auth);

  //Calls the remove function given the t value
  const removeHandler = (t: Todo) => {
    dispatch(RemoveTodoAction(t));
  };

  //Manages the checkbox logic
  const handleCheckboxChange = (todo: Todo) => {
    dispatch(ToggleTodoAction(todo)); // Dispatches the action with the todo object
    console.log('Todo being updated:', todo);
    console.log(Todo);
    console.log('Auth State:', authState);
  };

  //Handles the adding of tasks
  const addTodoHandler = (task: string) => {
    dispatch(AddTodoAction(task));
  };

  useEffect(() => {
    // Log authState whenever it changes
    console.log('Auth State app.tsx:', authState);
  }, [authState]); // Run this effect whenever authState changes

  return (
    // Formerly: App
    <div className="text-center">
      {/* Formerly App-Header */}
      <header className="bg-blue-200 min-h-screen flex flex-col items-center text-white text-lg">
        {/* Always displayed */}
        <TitleHeader />
        {/* Conditionally renders based on if user is logged in or not */}
        {authState.isLoggedIn ? (
          // authState : true , User IS logged in
          <div>
          <TodoForm addTodo={addTodoHandler} />
          {todos.length > 0 && (
            <TodoList
              todos={todos}
              handleCheckboxChange={handleCheckboxChange}
              removeHandler={removeHandler}
            />
          )}
          </div>
        ) : (
          // authState : false , User is NOT logged in
          <div>
            <AuthContainer />
          </div>
        )}

      </header>
    </div>
  );
}

export default App;
