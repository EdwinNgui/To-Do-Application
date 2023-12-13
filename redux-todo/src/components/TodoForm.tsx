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
      <input placeholder="What's next?" ref={todoTaskRef} id="task-input" />
      <button type="submit" id="add-btn">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
