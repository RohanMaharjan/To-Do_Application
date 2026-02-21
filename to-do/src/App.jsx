import { useState, useEffect } from 'react'
import './App.css'
import TodoItem from "./components/TodoItem"
import { v4 as uuidv4 } from "uuid"

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

      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      
      {/* add filter buttons */}
      <button onClick={addTodo}>Add</button>
      <button onClick={() => setFilter("all")}>All</button>
      <button onClick={() => setFilter("active")}>Active</button>
      <button onClick={() => setFilter("completed")}>Completed</button>

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