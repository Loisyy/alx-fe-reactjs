import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Testing Library', completed: false },
    { id: 2, text: 'Write unit tests with Jest', completed: false },
    { id: 3, text: 'Build a Todo List component', completed: true },
  ]);

  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo();
  };

  return (
    <div>
      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          data-testid="todo-input"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
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
        ))}
      </ul>
    </div>
  );
};

export default TodoList;