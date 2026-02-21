function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li>
      <span
        onClick={() => toggleComplete(todo.id)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </li>
  )
}

export default TodoItem