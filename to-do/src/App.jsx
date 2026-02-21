import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoItem from "./components/TodoItem"
import { v4 as uuidv4 } from "uuid"

function App() {
  const [input, setInput] =useState('')
  const [todos, setTodos] = useState([])
  const addTodo = () => {
    if(input.trim() == "") return
    setTodos([...todos, {id: uuidv4(), text: input, completed: false}])
    setInput('')
  }
  const deleteTodo = (id) => {
    const updated = todos.filter(todo => todo.id !== id)
    setTodos(updated)
  }
  const toggleComplete = (id) => {
    const updated = todos.map((todo) =>
      todo.id == id 
    ? {...todo,completed: !todo.completed}
  :todo
  )
  setTodos(updated)

  }
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if(saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
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
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
    </div>
  )
    
}

export default App
