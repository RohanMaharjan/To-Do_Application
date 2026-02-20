import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [input, setInput] =useState('')
  const [todos, setTodos] = useState([])
  const addTodo = () => {
    if(input.trim() == "") return
    setTodos([...todos, input])
    setInput('')
  }
  const deleteTodo = (indexToDelete) => {
    const updated = todos.filter((_, index) => index !== indexToDelete)
    setTodos(updated)
  }
  return(
    <div>
      <h1>To-Do App</h1>
    
    <input
      type='text'
      value={input}
      onChange= {(e) => setInput(e.target.value)} 
      placeholder="Enter text"
    />
    <button onClick={addTodo}>Add</button>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </ul>
    <ul>
      {todos.map((todo, index) => (
        <li key={index}>{todo}
          <button onClick={() => deleteTodo(index)}>Delete</button>
        </li>
      ))}
    </ul>
    </div>
  )
    
}

export default App
