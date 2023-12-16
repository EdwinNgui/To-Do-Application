import React, { useRef, FormEvent } from "react";

interface TodoFormProps {
  addTodo: (task: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const todoTaskRef = useRef<HTMLInputElement>(null);

  //Tip: To understand changes in handle function pls read useRef docs
  // => useRef handles background variables without triggering a re-render
  //Handles the submission of input
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const task = todoTaskRef.current?.value;
    if (task?.trim()) {
      addTodo(task);
      todoTaskRef.current!.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="What's next?" ref={todoTaskRef} className="font-inter w-72 p-2 rounded-full border-0 text-lg text-black" />
      <button type="submit" id="add-btn" 
      className="font-inter px-7 py-2 rounded-3xl text-lg ml-5 bg-green-500 
      hover:bg-green-600 text-white focus:outline-none">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
