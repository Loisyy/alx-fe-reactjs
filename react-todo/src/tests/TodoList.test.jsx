import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// ── Render Tests ───────────────────────────────────────────────────────────────
test('renders the Todo List heading', () => {
  render(<TodoList />);
  expect(screen.getByText(/todo list/i)).toBeInTheDocument();
});

test('renders the input field', () => {
  render(<TodoList />);
  expect(screen.getByTestId('todo-input')).toBeInTheDocument();
});

test('renders the Add Todo button', () => {
  render(<TodoList />);
  expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
});

test('renders initial todo items', () => {
  render(<TodoList />);
  expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
  expect(screen.getByText('Write unit tests with Jest')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo List component')).toBeInTheDocument();
});

// ── Add Todo Tests ─────────────────────────────────────────────────────────────
test('adds a new todo when the form is submitted', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');
  const addBtn = screen.getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'Buy groceries' } });
  fireEvent.click(addBtn);

  expect(screen.getByText('Buy groceries')).toBeInTheDocument();
});

test('clears the input field after adding a todo', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');
  const addBtn = screen.getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'New task' } });
  fireEvent.click(addBtn);

  expect(input).toHaveValue('');
});

test('does not add a todo when input is empty', () => {
  render(<TodoList />);
  const addBtn = screen.getByRole('button', { name: /add todo/i });

  fireEvent.click(addBtn);

  expect(screen.getAllByRole('listitem')).toHaveLength(3);
});

test('adds a todo on form submit via Enter key', () => {
  render(<TodoList />);
  const input = screen.getByTestId('todo-input');

  fireEvent.change(input, { target: { value: 'Go for a run' } });
  fireEvent.submit(input.closest('form'));

  expect(screen.getByText('Go for a run')).toBeInTheDocument();
});

// ── Toggle Tests ───────────────────────────────────────────────────────────────
test('toggles a todo to completed when clicked', () => {
  render(<TodoList />);
  const todoText = screen.getByTestId('todo-text-1');

  fireEvent.click(todoText);

  expect(todoText).toHaveStyle('text-decoration: line-through');
});

test('toggles a completed todo back to incomplete', () => {
  render(<TodoList />);
  // todo id=3 starts completed
  const todoText = screen.getByTestId('todo-text-3');

  fireEvent.click(todoText);

  expect(todoText).toHaveStyle('text-decoration: none');
});

test('initially completed todo has line-through style', () => {
  render(<TodoList />);
  expect(screen.getByTestId('todo-text-3')).toHaveStyle(
    'text-decoration: line-through'
  );
});

test('initially incomplete todo has no line-through', () => {
  render(<TodoList />);
  expect(screen.getByTestId('todo-text-1')).toHaveStyle(
    'text-decoration: none'
  );
});

// ── Delete Tests ───────────────────────────────────────────────────────────────
test('deletes a todo when the delete button is clicked', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByTestId('delete-btn-1'));
  expect(screen.queryByText('Learn React Testing Library')).not.toBeInTheDocument();
});

test('does not remove other todos when one is deleted', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByTestId('delete-btn-1'));
  expect(screen.getByText('Write unit tests with Jest')).toBeInTheDocument();
  expect(screen.getByText('Build a Todo List component')).toBeInTheDocument();
});

test('reduces the list count by one after a deletion', () => {
  render(<TodoList />);
  fireEvent.click(screen.getByTestId('delete-btn-2'));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

test('can delete all todos', () => {
  render(<TodoList />);
  [1, 2, 3].forEach((id) => {
    fireEvent.click(screen.getByTestId(`delete-btn-${id}`));
  });
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
});

test('can add a todo after all todos are deleted', () => {
  render(<TodoList />);
  [1, 2, 3].forEaimport React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders initial todos', () => {
    render(<TodoList />);
    
    // Check if component renders
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    
    // Check initial todos
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    
    // Check form elements
    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-btn')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-btn');
    
    // Add new todo
    fireEvent.change(input, { target: { value: 'New Test Todo' } });
    fireEvent.click(addButton);
    
    // Check if new todo is added
    expect(screen.getByText('New Test Todo')).toBeInTheDocument();
    
    // Check if input is cleared
    expect(input.value).toBe('');
  });

  test('does not add empty todo', () => {
    render(<TodoList />);
    
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    const addButton = screen.getByTestId('add-btn');
    
    // Try to add empty todo
    fireEvent.click(addButton);
    
    // Check that no new todo was added
    const todosAfter = screen.getAllByRole('listitem');
    expect(todosAfter.length).toBe(initialCount);
  });

  test('toggles todo completion', () => {
    render(<TodoList />);
    
    const todoText = screen.getByText('Learn React');
    const todoItem = todoText.closest('li');
    
    // Initially not completed
    expect(todoItem).not.toHaveClass('completed');
    
    // Click to toggle
    fireEvent.click(todoText);
    
    // Should be completed now
    expect(todoItem).toHaveClass('completed');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // Should not be completed
    expect(todoItem).not.toHaveClass('completed');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    const todoToDelete = screen.getByText('Learn React');
    const deleteButton = screen.getByTestId('delete-btn-1');
    
    // Get initial count
    const initialTodos = screen.getAllByRole('listitem');
    const initialCount = initialTodos.length;
    
    // Delete the todo
    fireEvent.click(deleteButton);
    
    // Check todo is removed
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
    
    // Check count decreased
    const todosAfter = screen.getAllByRole('listitem');
    expect(todosAfter.length).toBe(initialCount - 1);
  });

  test('displays correct todo statistics', () => {
    render(<TodoList />);
    
    const stats = screen.getByTestId('todo-count');
    
    // Initial stats: 3 total, 1 completed, 2 pending
    expect(stats).toHaveTextContent('Total: 3');
    expect(stats).toHaveTextContent('Completed: 1');
    expect(stats).toHaveTextContent('Pending: 2');
    
    // Add a new todo
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-btn');
    
    fireEvent.change(input, { target: { value: 'Another Todo' } });
    fireEvent.click(addButton);
    
    // Stats should update
    expect(stats).toHaveTextContent('Total: 4');
    expect(stats).toHaveTextContent('Completed: 1');
    expect(stats).toHaveTextContent('Pending: 3');
    
    // Toggle a todo
    const todoText = screen.getByText('Learn React');
    fireEvent.click(todoText);
    
    // Stats should update again
    expect(stats).toHaveTextContent('Total: 4');
    expect(stats).toHaveTextContent('Completed: 2');
    expect(stats).toHaveTextContent('Pending: 2');
    
    // Delete a todo
    const deleteButton = screen.getByTestId('delete-btn-1');
    fireEvent.click(deleteButton);
    
    // Final stats
    expect(stats).toHaveTextContent('Total: 3');
    expect(stats).toHaveTextContent('Completed: 1');
    expect(stats).toHaveTextContent('Pending: 2');
  });
});ch((id) => {
    fireEvent.click(screen.getByTestId(`delete-btn-${id}`));
  });

  const input = screen.getByTestId('todo-input');
  fireEvent.change(input, { target: { value: 'Fresh start' } });
  fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

  expect(screen.getByText('Fresh start')).toBeInTheDocument();
});