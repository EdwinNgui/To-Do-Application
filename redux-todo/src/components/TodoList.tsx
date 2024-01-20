import React from "react";
import { Todo } from "../types/Todo.Types";

interface TodoListProps {
  todos: Todo[];
  handleCheckboxChange: (todo: Todo) => void;
  removeHandler: (todo: Todo) => void;
}

//Contains the bulk of the notepad/todo display
const TodoList: React.FC<TodoListProps> = ({
  todos,
  handleCheckboxChange,
  removeHandler,
}) => {
  return (
    // Formerly: notepad
    <div className="bg-yellow-100 py-1 mt-8 relative w-4/5 mx-auto">
      <div className="mx-28 flex-col">
        {/* Incorporates the two red lines */}
        <div className="absolute h-full inset-y-0 left-3 bg-red-400 w-0.5"></div>

        {/* Formerly: allTodos */}
        <ul className="list-none m-0 p-0">
          {todos.map((todo, ind) => (
            // Formerly: singleTodo
            <li
              key={todo._id}
              className="my-6 px-0 pb-4 flex w-full border-b border-blue-500 
                last:border-none"
            >
              {/* Formerly: todo-checkbox */}
              {/* Allows for the elements to be aligned properly and clicked */}
              <label className="flex items-center cursor-pointer">
                {/* The actual html checkbox */}
                <input
                  type="checkbox"
                  id={`todo-${ind}`}
                  className="hidden"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo)}
                />
                {/* Custom replacement for the checkbox (so we can style it) */}
                <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center bg-white mr-1">
                  {/* Conditional statement using jsx syntax */}
                  {todo.completed && (
                    <span className="text-black font-inter font-semibold text-xs">
                      X
                    </span>
                  )}
                </div>
              </label>

              {/* Formerly: todo-text */}
              {/* Certain styling applies conditionally if todo.completed is true */}
              <span
                className={`flex ${
                  todo.completed ? "justify-start" : ""
                } items-center text-black font-sans ${
                  todo.completed
                    ? "font-normal line-through text-lg"
                    : "font-normal text-lg"
                } ml-1`}
              >
                {todo.task}
              </span>
              {/* Formerly: del-btn */}
              <button
                className="rounded-lg px-4 py-2 border-0 bg-gray-300 text-black font-bold text-lg 
                  transition duration-200 ease-in-out ml-auto
                  hover:bg-red-600 hover:text-white"
                onClick={() => removeHandler(todo)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
