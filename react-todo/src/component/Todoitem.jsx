const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <li data-testid={`todo-item-${todo.id}`}>
      <span
        onClick={() => toggleTodo(todo.id)}
        style={{
          textDecoration: todo.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        data-testid={`todo-text-${todo.id}`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        data-testid={`delete-btn-${todo.id}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;