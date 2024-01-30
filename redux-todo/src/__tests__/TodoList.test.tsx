// TodoList.test.tsx
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import TodoList from '../components/TodoList';
import '@testing-library/jest-dom';  // Import this line

//Mock data for the todo to test
const mockTodos = [
  { _id: '1', task: 'Task 1', completed: false },
  { _id: '2', task: 'Task 2', completed: true },
];

//Mock versions of the function we normally have
const mockHandleCheckboxChange = jest.fn();
const mockRemoveHandler = jest.fn();

//Testing the rendering of the todos
test('renders TodoList component with todos', () => {
  render(
    <TodoList
      todos={mockTodos}
      handleCheckboxChange={mockHandleCheckboxChange}
      removeHandler={mockRemoveHandler}
    />
  );

  //Check if each todo is rendered
  mockTodos.forEach((todo) => {
    const todoText = screen.getByText(todo.task);
    expect(todoText).toBeInTheDocument();
  });
});


//Checks for the completed status
test('handles checkbox change correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        handleCheckboxChange={mockHandleCheckboxChange}
        removeHandler={mockRemoveHandler}
      />
    );
  
    // Click the checkbox for the first todo
    fireEvent.click(screen.getByLabelText(/Task 1/i)); // Using a regular expression to match case-insensitive
  
    // Check if the handleCheckboxChange function is called with the correct todo
    expect(mockHandleCheckboxChange).toHaveBeenCalledWith(mockTodos[0]);
  });
  

//Checks for the remove button
test('handles remove button click correctly', () => {
    render(
      <TodoList
        todos={mockTodos}
        handleCheckboxChange={mockHandleCheckboxChange}
        removeHandler={mockRemoveHandler}
      />
    );
  
    // Find the list item containing "Task 1"
    const listItem = screen.getByText('Task 1').closest('li');
  
    // Use within to scope queries to the parent list item
    const deleteButton = within(listItem).getByRole('button', { name: 'Delete' });
  
    // Click the "Delete" button for "Task 1"
    fireEvent.click(deleteButton);
  
    // Check if the removeHandler function is called with the correct todo
    expect(mockRemoveHandler).toHaveBeenCalledWith(mockTodos[0]);
  });
  
