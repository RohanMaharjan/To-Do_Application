function TodoItem({
  todo,
  toggleComplete,
  deleteTodo,
  startEdit,
  saveEdit,
  editId,
  editText,
  setEditText,
}) {
  const isEditing = editId === todo.id

  return (
    <li>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button onClick={() => saveEdit(todo.id)}>Save</button>
        </>
      ) : (
        <>
          <span
            onClick={() => toggleComplete(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer"
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => startEdit(todo)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  )
}

export default TodoItem