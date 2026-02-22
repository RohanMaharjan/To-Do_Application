function AddTodo({ input, setInput, addTodo }) {
  return (
    <div className="add-todo">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTodo}>Add</button>
    </div>
  )
}

export default AddTodo