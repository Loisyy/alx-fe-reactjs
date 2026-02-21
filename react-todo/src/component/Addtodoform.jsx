import { useState } from 'react';

const AddTodoForm = ({ onAdd }) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setError('Please enter a todo item.');
      return;
    }
    onAdd(value);
    setValue('');
    setError('');
  };

  return (
    <form className="add-todo-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        className="add-todo-input"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (error) setError('');
        }}
        placeholder="What needs to be done?"
        aria-label="New todo input"
      />
      <button type="submit" className="add-todo-btn" aria-label="Add todo">
        Add
      </button>
      {error && <p className="add-todo-error" role="alert">{error}</p>}
    </form>
  );
};

export default AddTodoForm;