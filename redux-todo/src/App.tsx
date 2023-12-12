import "./App.css";
import React, { useRef, FormEvent } from "react";

// Custom hooks for redux thunk made by Rahat (see './hooks/thunk')
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction, ToggleTodoAction } from "./actions/TodoActions";
import { RootState, Todo } from "./types"; // Replace with your RootState and Todo types

function App() {
  //Tip: Implement useRef hook rather than useState
  // => because useState manages local state (also managed in redux) and can cause re-renders
  // => where as useRef does not re-render when values change
  const todoTaskRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const Todo = useAppSelector((state: RootState) => state.Todo);
  const { todos } = Todo;

  //Tip: To understand changes in handle function pls read useRef docs
  // => useRef handles background variables without triggering a re-render
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = todoTaskRef.current?.value;
    if (task?.trim()) {
      dispatch(AddTodoAction(task));
      todoTaskRef.current!.value = "";
    }
  };

  //Calls the remove function given the t value
  const removeHandler = (t: Todo) => {
    dispatch(RemoveTodoAction(t));
  };

  //Manages the checkbox logic
  const handleCheckboxChange = (todo: Todo) => {
    dispatch(ToggleTodoAction(todo)); // Dispatches the action with the todo object
    console.log('Todo being updated:', todo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2 id="title">Task Time</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="What's next?"
            ref={todoTaskRef}
            id="task-input"
          />
          <button
            type="submit"
            id="add-btn"
          >
            Add
          </button>
        </form>

        {/* Next line ensures no rendering for empty array of Todo */}
        {todos.length > 0 && (
          <div className="notepad">
            <ul className="allTodos">
              {/* task mapping */}
              {todos.map((todo) => (
                <li key={todo.id} className="singleTodo">
                  {/* Handles checkbox */}
                  <input
                    type="checkbox"
                    id={`todo-${todo.id}`}
                    className="todo-checkbox"
                    checked={todo.completed}
                    onChange={() => handleCheckboxChange(todo)}
                  />
                  
                  {/* Handles text and completion status */}
                  <span className={todo.completed ? 'todoText completed' : 'todoText'}>
                    {todo.task}
                  </span>
                   
                  {/* Handles deletion button */}
                  <button
                    id="del-btn"
                    onClick={() => removeHandler(todo)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
