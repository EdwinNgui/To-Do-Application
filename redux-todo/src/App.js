import './App.css';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToDoAction, RemoveToDoAction } from './actions/TodoActions';

function App() {
  
  const [todo, setTodo] = useState();

  const dispatch = useDispatch();
  const Todo = useSelector((state) => state.Todo);

  const { todos } = Todo;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddToDoAction(Todo));
    console.log(e);
  };

  // Ensures single task and no spam adding
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (todo) {
  //     dispatch(AddToDoAction({ id: Date.now(), todo })); // Pass the new 'todo'
  //     setTodo(''); // Clear the input after adding todo
  //   }
  // };
  
  const removeHandler = (t) => {
    dispatch(RemoveToDoAction(t));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>To Do List App in Redux</h2>
        
        {/* Input form */}
        <form onSubmit={handleSubmit}>
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
          onChange={(e) => setTodo(e.target.value)}
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
            {
              todos && todos.map((t) => (
                <li key={t.id} className='singleTodo'>
                <span className='todoText'>{t.todo}</span>
                <button
                  style={{
                    borderRadius: 25,
                    padding: 10,
                    border: "1px solid white",
                    color: "white",
                    backgroundColor: "orangered"
                  }} onClick={() => removeHandler(t)}
                  >Delete</button>
              </li>
              ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
