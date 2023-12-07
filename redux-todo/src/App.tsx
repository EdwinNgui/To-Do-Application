import "./App.css";
import React, { useState, FormEvent } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/thunk";
import { AddTodoAction, RemoveTodoAction } from "./actions/TodoActions";
import { RootState, Todo } from "./types"; // Replace with your RootState and Todo types

function App() {
  //const [todo, setTodo] = useState<Todo>({ id: '', /* other properties */ });
  const [todo, setTodo] = useState<string>("");
  const dispatch = useAppDispatch();
  const Todo = useAppSelector((state: RootState) => state.Todo);
  const { todos } = Todo;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      dispatch(AddTodoAction(todo));
      setTodo("");
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
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: "none",
              fontSize: 20,
            }}
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
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
          {todos.map((todo) => (
            <li key={todo.id} className="singleTodo">
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
