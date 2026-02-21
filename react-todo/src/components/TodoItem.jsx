import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li 
      className={`todo-item ${todo.completed ? 'completed' : ''}`}
      data-testid={`todo-item-${todo.id}`}
    >
      <span
        className="todo-text"
        onClick={() => onToggle(todo.id)}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
      >
        {todo.text}
      </span>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        data-testid={`delete-btn-${todo.id}`}
        aria-label={`Delete ${todo.text}`}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;