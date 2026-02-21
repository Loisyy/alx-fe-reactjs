const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <button
        className="todo-toggle"
        onClick={() => onToggle(todo.id)}
        aria-label={`Toggle: ${todo.text}`}
        aria-pressed={todo.completed}
      >
        <span className="todo-checkbox">{todo.completed ? '✓' : ''}</span>
        <span className="todo-text">{todo.text}</span>
      </button>

      <button
        className="todo-delete"
        onClick={() => onDelete(todo.id)}
        aria-label={`Delete: ${todo.text}`}
      >
        ✕
      </button>
    </li>
  );
};

export default TodoItem;