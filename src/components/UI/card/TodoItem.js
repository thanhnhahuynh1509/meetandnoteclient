function TodoItem(props) {
  const [content, setContent] = useState(props.content);

  const toogleCompleteTodo = (id) => {
    const data = value.map((m) => {
      if (m.id === id) {
        return { ...m, isCompleted: !m.isCompleted };
      }
      return m;
    });
    setValue(data);
  };
  return (
    <div className="Todo">
      <input
        type="checkbox"
        checked={content.isDone}
        onChange={() => toogleCompleteTodo(m.id)}
      />
      <input
        className={`card-text ${content.isDone && "done"}`}
        type="text"
        placeholder="Add task..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={(e) => handleKeyDown(e, m.id)}
        value={m.content}
        onChange={(e) => handleOnChange(e, m.id)}
        ref={lastInputTodoRef}
      />
    </div>
  );
}

export default TodoItem;
