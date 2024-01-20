import React from "react";

// Custom hooks for redux thunk hooks made by Rahat (see './hooks/thunk')
import { useAppSelector, useAppDispatch } from "../hooks/thunk";
import { RootState } from "../types/Root.Types"; // Replace with your RootState and Todo types
import { Todo } from "../types/Todo.Types";

//components
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

//actions
import {
  AddTodoAction,
  RemoveTodoAction,
  ToggleTodoAction,
} from "../actions/TodoActions";

export default function TodoContainer() {
  const dispatch = useAppDispatch();
  const { todos } = useAppSelector((state: RootState) => state.Todo);

  //Calls the remove function given the t value
  const removeHandler = (t: Todo) => {
    dispatch(RemoveTodoAction(t));
  };

  //Manages the checkbox logic
  const handleCheckboxChange = (todo: Todo) => {
    dispatch(ToggleTodoAction(todo)); // Dispatches the action with the todo object
  };

  //Handles the adding of tasks
  const addTodoHandler = (task: string) => {
    dispatch(AddTodoAction(task));
  };
  return (
    <div className="w-[80%]">
      <TodoForm addTodo={addTodoHandler} />
      {todos.length > 0 && (
        <TodoList
          todos={todos}
          handleCheckboxChange={handleCheckboxChange}
          removeHandler={removeHandler}
        />
      )}
    </div>
  );
}
