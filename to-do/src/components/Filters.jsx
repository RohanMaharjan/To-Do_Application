function Filters({ filter, setFilter }) {
  return (
    <div style={{ margin: "10px 0" }}>
      <button onClick={() => setFilter("all")}>
        All
      </button>

      <button onClick={() => setFilter("active")}>
        Active
      </button>

      <button onClick={() => setFilter("completed")}>
        Completed
      </button>
    </div>
  )
}

export default Filters