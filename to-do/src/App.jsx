import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from "./components/TodoItem"
import AddTodo from './components/Addtodo'
import { v4 as uuidv4 } from "uuid"
import Filters from "./components/Filters"

function App() {
  // Input for new task
  const [input, setInput] = useState('')

  // List of todos
  const [todos, setTodos] = useState([])

  // Add new todo
  const addTodo = () => {
    if (input.trim() === "") return
    setTodos([
      ...todos,
      { id: uuidv4(), text: input, completed: false }
    ])
    setInput('')
  }

  // Delete a todo
  const deleteTodo = (id) => {
    const updated = todos.filter(todo => todo.id !== id)
    setTodos(updated)
  }

  // Toggle complete
  const toggleComplete = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updated)
  }

  // Edit state
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  // Start editing a todo
  const startEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  // Save edited todo
  const saveEdit = (id) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, text: editText } : todo
    )
    setTodos(updated)
    setEditId(null)
    setEditText("")
  }

  //add filter state
  const [filter, setFilter] = useState("all") // all | active | completed

  // Load todos from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("todos")
    if (saved) {
      setTodos(JSON.parse(saved))
    }
  }, [])

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <div className="App">
      <h1>To-Do App</h1>

      <AddTodo input={input} setInput={setInput} addTodo={addTodo} />

      {/* add filter buttons */}
      <Filters filter={filter} setFilter={setFilter} />

      {/* task counter */}
      <p className="task-counter">
      {todos.filter(todo => !todo.completed).length} tasks left
      </p>

      <ul>
        {todos.filter(todo => {
          if (filter === "all") return true
          if (filter === "active") return !todo.completed
          if (filter === "completed") return todo.completed
          return true
        }).map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            startEdit={startEdit}
            editId={editId}
            editText={editText}
            setEditText={setEditText}
            saveEdit={saveEdit}
          />
        ))}
      </ul>
    </div>
  )
}

export default App