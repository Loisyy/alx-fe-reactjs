import { useState } from 'react';
import AddTodoForm from '../component/Addtodoform';
import TodoItem from './Todoitem';
import '../styles/Todolist.css';

const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Write unit tests with Jest', completed: false },
  { id: 3, text: 'Build a Todo List component', completed: true },
];

const TodoList = () => {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="todo-wrapper">
      <header className="todo-header">
        <h1>📝 Todo List</h1>
        <span className="todo-counter">
          {remaining} task{remaining !== 1 ? 's' : ''} remaining
        </span>
      </header>

      <AddTodoForm onAdd={addTodo} />

      {todos.length === 0 ? (
        <p className="todo-empty">No todos yet — add one above!</p>
      ) : (
        <ul className="todo-list" aria-label="todo list">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <footer className="todo-footer">
          {todos.length} total · {todos.filter((t) => t.completed).length} completed
        </footer>
      )}
    </div>
  );
};

export default TodoList;