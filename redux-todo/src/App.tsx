import "./App.css";
import React, { useRef, FormEvent } from "react";

// Custom hooks for redux thunk made by Rahat (see './hooks/thunk')
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction } from "./actions/TodoActions";
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

  return (
    <div className="App">
      <header className="App-header">
        <h2>To Do List App in Redux</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Enter a task"
            ref={todoTaskRef}
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: "none",
              fontSize: 20,
            }}
          />
          <button
            type="submit"
            style={{
              padding: 12,
              borderRadius: 25,
              fontSize: 15,
              marginLeft: 20,
            }}
          >
            Go
          </button>
        </form>

        <ul className="allTodos">
          {/* Uses variable name of todo to specifically show what is being mapped */}
          {/* Takes the todos (array of todo objects) and maps each object to become available */}
          {todos.map((todo) => (
            <li key={todo.id} className="singleTodo">
              {/* Todo text is equivalent to task property of todo object not id!*/}
              <span className="todoText">{todo.task}</span>
              <button
                style={{
                  borderRadius: 25,
                  padding: 10,
                  border: "1px solid white",
                  color: "white",
                  backgroundColor: "orangered",
                }}
                onClick={() => removeHandler(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
