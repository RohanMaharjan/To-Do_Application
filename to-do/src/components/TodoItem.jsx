function TodoItem({ todo, index, toggleComplete, deleteTodo }) {
  return (
    <li>
      <span
        onClick={() => toggleComplete(index)}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          cursor: "pointer"
        }}
      >
        {todo.text}
      </span>

      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  )
}

export default TodoItem