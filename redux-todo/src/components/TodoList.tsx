import React, { useEffect, useState } from "react";
import { Todo } from "../types/todoTypes";

interface TodoListProps {
  todos: Todo[];
  handleCheckboxChange: (todo: Todo) => void;
  removeHandler: (todo: Todo) => void;
}

  const TodoList: React.FC<TodoListProps> = ({ handleCheckboxChange, removeHandler }) => {
    const [todos, setTodos] = useState<Todo[]>([]);
  
    //This is supposed to fetch the user's todos array currently delayed bc of "Failed to load resource: the server responded with a status of 401 (Unauthorized)"
    useEffect(() => {
      const fetchTodos = async () => {
        try {
          const response = await fetch("http://[::1]/v1/todos/", {
            headers: {
              Authorization: `Bearer YOUR_ACCESS_TOKEN`,
              //Note to self: Issue comes here with doing the JWT token stuff
            },
          });
  
          if (response.ok) {
            const data = await response.json();
  
            //Prepares the todo information
            if (Array.isArray(data)) {
              setTodos(data);
            } else if (data.todos) {
              setTodos(data.todos);
            } else {
              console.error("Invalid data format received:", data);
            }
          } else {
            //Issue: comes here
            console.error("Failed to fetch todos. Status code:", response.status);
          }
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      };
  
      fetchTodos();
    }, []);
  
  return (
    <div className="bg-yellow-100 py-1 mt-8 relative w-full mx-auto">
      <div className="mx-28 flex-col">
        <div className="absolute h-full inset-y-0 left-3 bg-red-400 w-0.5"></div>
        <div className="absolute h-full inset-y-0 left-5 bg-red-400 w-0.5"></div>
        <ul className="list-none m-0 p-0">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="my-6 px-0 pb-4 flex w-full border-b border-blue-500 last:border-none items-center"
            >
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  className="hidden"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo)}
                />
                <div className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center bg-white mr-2">
                  {todo.completed && (
                    <span className="text-black font-inter font-semibold text-xs">X</span>
                  )}
                </div>
              </label>

              <span
                className={`flex items-center text-black font-sans ${
                  todo.completed ? "font-normal line-through text-lg" : "font-normal text-lg"
                } ml-2`}
              >
                {todo.task}
              </span>

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
