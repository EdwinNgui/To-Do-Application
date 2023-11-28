import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToDoAction, RemoveToDoAction } from './actions/TodoActions';

function App() {
  const Todo = useSelector((state) => state.Todo);
  const { todos } = Todo;

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(AddToDoAction(Todo));
  };
  const removeHandler = (t) => {
  console.log(t);
  dispatch(RemoveToDoAction(t));
  };


  return (
    <div className="App">
      <header className="App-header">
        <h2>To Do List App in Redux</h2>
        
        {/* Input form */}
        <form>
          <input 
            placeholder="Enter a task"
            style={{
              width: 350,
              padding: 10,
              borderRadius: 20,
              border: "none", 
              fontSize: 20
            }
          }
          />
          <button 
            type="submit" 
            style={{
              padding: 12,
              borderRadius: 25,
              fontSize: 15,
              marginLeft: 20
            }}
          >Go</button>
        </form>
        
        {/* Displaying our list of items */}
        <ul className='allTodos'>
            <li className='singleTodo'>
              <span className='todoText'>First to do</span>
              <button
                style={{
                  borderRadius: 25,
                  padding: 10,
                  border: "1px solid white",
                  color: "white",
                  backgroundColor: "orangered"
                }}>Delete</button>
            </li>
        </ul>
        
      </header>
    </div>
  );
}

export default App;
