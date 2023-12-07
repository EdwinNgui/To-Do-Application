import "./App.css";
import React, { useRef, FormEvent } from "react";

//these are custom hooks for redux thunk to work made by me!!
//see the source of how i made in ./hooks/thunk file!!
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction } from "./actions/TodoActions";
import { RootState, Todo } from "./types"; // Replace with your RootState and Todo types

function App() {
  //you should be using useRef Hook instead of useState for input #bestPractices
  //as we are already handling state in redux
  const todoTaskRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const Todo = useAppSelector((state: RootState) => state.Todo);
  const { todos } = Todo;

  //to understand changes in handle function pls read useRef docs
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = todoTaskRef.current?.value;
    if (task?.trim()) {
      dispatch(AddTodoAction(task));
      todoTaskRef.current!.value = "";
    }
  };

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
          {/* Please dont use variables like t instead use todo! */}
          {todos.map((todo) => (
            <li key={todo.id} className="singleTodo">
              {/* todo text is equavalent to task property of todo object not id!*/}
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
