import './App.css';
import React, { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddTodoAction, RemoveTodoAction } from './actions/TodoActions';
import { RootState, Todo } from './types'; // Replace with your RootState and Todo types

function App() {
  //const [todo, setTodo] = useState<Todo>({ id: '', /* other properties */ });
  const [todo, setTodo] = useState<string>('');
  const dispatch = useDispatch();
  const Todo = useSelector((state: RootState) => state.Todo);
  const { todos } = Todo;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo.trim()) {
      //ISSUE: get store working first to ensure the todo is not void
      dispatch(AddTodoAction(todo));
      setTodo('');
    }
  };

  const removeHandler = (t: Todo) => {
    dispatch(RemoveTodoAction(t.id));
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
              fontSize: 20
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
              marginLeft: 20
            }}
          >
            Go
          </button>
        </form>
        
        <ul className='allTodos'>
          {todos.map((t) => (
            <li key={t.id} className='singleTodo'>
              <span className='todoText'>{t.id}</span>
              <button
                style={{
                  borderRadius: 25,
                  padding: 10,
                  border: "1px solid white",
                  color: "white",
                  backgroundColor: "orangered"
                }}
                onClick={() => removeHandler(t)}
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



// import './App.css';
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddTodoAction, RemoveTodoAction } from './actions/TodoActions';

// function App() {
  
//   //Consts needed for transfering object/array information
//   const [todo, setTodo] = useState();
//   const dispatch = useDispatch();
//   const Todo = useSelector((state) => state.Todo);
//   const { todos } = Todo;

//   //Handles info for adding
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(AddTodoAction(todo));
//     console.log(e);
//   };
  
//   //Handles info for removing
//   const removeHandler = (t) => {
//     dispatch(RemoveTodoAction(t.id));
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h2>To Do List App in Redux</h2>
        
//         {/* Input form */}
//         <form onSubmit={handleSubmit}>
//           <input 
//             placeholder="Enter a task"
//             style={{
//               width: 350,
//               padding: 10,
//               borderRadius: 20,
//               border: "none", 
//               fontSize: 20
//             }
//           }
//           onChange={(e) => setTodo(e.target.value)}
//           />
//           <button 
//             type="submit" 
//             style={{
//               padding: 12,
//               borderRadius: 25,
//               fontSize: 15,
//               marginLeft: 20
//             }}
//           >Go</button>
//         </form>
        
//         {/* Displaying our list of items */}
//         <ul className='allTodos'>
//             {
//               todos && todos.map((t) => (
//                 <li key={t.id} className='singleTodo'>
//                 <span className='todoText'>{t.id}</span>
//                 <button
//                   style={{
//                     borderRadius: 25,
//                     padding: 10,
//                     border: "1px solid white",
//                     color: "white",
//                     backgroundColor: "orangered"
//                   }} onClick={() => removeHandler(t)}
//                   >Delete</button>
//               </li>
//               ))}
//         </ul>
//       </header>
//     </div>
//   );
// }

// export default App;
