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
  [1, 2, 3].forEach((id) => {
    fireEvent.click(screen.getByTestId(`delete-btn-${id}`));
  });

  const input = screen.getByTestId('todo-input');
  fireEvent.change(input, { target: { value: 'Fresh start' } });
  fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

  expect(screen.getByText('Fresh start')).toBeInTheDocument();
});