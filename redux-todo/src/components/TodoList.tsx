import React from "react";
import { Todo } from "../types";

//For TS, defines the properties being moved between app.js and this component
interface TodoListProps {
  todos: Todo[];
  handleCheckboxChange: (todo: Todo) => void;
  removeHandler: (todo: Todo) => void;
}

//Contains the bulk of the notepad/todo display
const TodoList: React.FC<TodoListProps> = ({ todos, handleCheckboxChange, removeHandler }) => {
  return (
    <div className="notepad">
      <ul className="allTodos">
        {todos.map((todo) => (
          <li key={todo.id} className="singleTodo">
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              className="todo-checkbox"
              checked={todo.completed}
              onChange={() => handleCheckboxChange(todo)}
            />
            <span className={todo.completed ? "todoText completed" : "todoText"}>
              {todo.task}
            </span>
            <button id="del-btn" onClick={() => removeHandler(todo)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
