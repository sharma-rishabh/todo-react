import { Link, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

function TodoItem({ todo }) { 
  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
    </div>
  );
}

function Todo() {
  const {id} = useParams()
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    fetch(`/api/todo/${id-1}`).then(res => res.json()).then(data => {
      setTodo(data);
    })
  }, [id]);
  return ( 
    <div>
      {todo ? <TodoItem todo={todo}/> : <div>Loading...</div>}
    </div>
  );

}


function TodoApp() { 
  const [todos, setTodos] = useState([]);
  
  useEffect(() => {
    fetch('/api/all-todos').then(res => res.json()).then(data => {
      setTodos(data);
    })
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      {
        todos.map(todo => {
          return (
            <Link to={`/todo/${todo.id}`}><div>{todo.id} {todo.title}</div></Link>
          );
        })
      }
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />} />
      <Route path="/todo/:id" element={<Todo />} />
    </Routes>
    // <TodoApp />
  );
}

export default App;
