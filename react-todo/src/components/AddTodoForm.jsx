
import React, { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form" data-testid="add-todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new todo..."
        data-testid="todo-input"
      />
      <button type="submit" data-testid="add-btn">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
