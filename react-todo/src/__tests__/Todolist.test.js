import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// ─── Helper ────────────────────────────────────────────────────────────────────
const renderTodoList = () => render(<TodoList />);

// ─── 1. Initial Render Tests ───────────────────────────────────────────────────
describe('TodoList — Initial Render', () => {
  test('renders the Todo List heading', () => {
    renderTodoList();
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test('renders the input field', () => {
    renderTodoList();
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
  });

  test('renders the Add Todo button', () => {
    renderTodoList();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  test('renders initial todo items', () => {
    renderTodoList();
    expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
    expect(screen.getByText('Write unit tests with Jest')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo List component')).toBeInTheDocument();
  });

  test('renders the todo list container', () => {
    renderTodoList();
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  });
});

// ─── 2. Adding Todo Tests ──────────────────────────────────────────────────────
describe('TodoList — Adding Todos', () => {
  test('adds a new todo when form is submitted', () => {
    renderTodoList();
    const input = screen.getByTestId('todo-input');
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('Buy groceries')).toBeInTheDocument();
  });

  test('clears the input field after adding a todo', () => {
    renderTodoList();
    const input = screen.getByTestId('todo-input');
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Read a book' } });
    fireEvent.click(addBtn);

    expect(input).toHaveValue('');
  });

  test('does not add a todo when input is empty', () => {
    renderTodoList();
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addBtn);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('adds a todo when form is submitted with Enter key', () => {
    renderTodoList();
    const input = screen.getByTestId('todo-input');

    fireEvent.change(input, { target: { value: 'Go for a run' } });
    fireEvent.submit(input.closest('form'));

    expect(screen.getByText('Go for a run')).toBeInTheDocument();
  });

  test('can add multiple todos in sequence', () => {
    renderTodoList();
    const input = screen.getByTestId('todo-input');
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Task A' } });
    fireEvent.click(addBtn);
    fireEvent.change(input, { target: { value: 'Task B' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('Task A')).toBeInTheDocument();
    expect(screen.getByText('Task B')).toBeInTheDocument();
  });
});

// ─── 3. Toggling Todo Tests ────────────────────────────────────────────────────
describe('TodoList — Toggling Todos', () => {
  test('toggles a todo to completed when clicked', () => {
    renderTodoList();
    const todoText = screen.getByText('Learn React Testing Library');

    fireEvent.click(todoText);

    expect(todoText).toHaveStyle('text-decoration: line-through');
  });

  test('toggles a completed todo back to incomplete when clicked again', () => {
    renderTodoList();
    // "Build a Todo List component" starts as completed
    const todoText = screen.getByText('Build a Todo List component');

    fireEvent.click(todoText);

    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('does not affect other todos when one is toggled', () => {
    renderTodoList();
    const firstTodo = screen.getByText('Learn React Testing Library');
    const secondTodo = screen.getByText('Write unit tests with Jest');

    fireEvent.click(firstTodo);

    expect(firstTodo).toHaveStyle('text-decoration: line-through');
    expect(secondTodo).toHaveStyle('text-decoration: none');
  });

  test('initially completed todo has line-through style', () => {
    renderTodoList();
    const completedTodo = screen.getByText('Build a Todo List component');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  test('initially incomplete todo has no line-through style', () => {
    renderTodoList();
    const incompleteTodo = screen.getByText('Learn React Testing Library');
    expect(incompleteTodo).toHaveStyle('text-decoration: none');
  });
});

// ─── 4. Deleting Todo Tests ────────────────────────────────────────────────────
describe('TodoList — Deleting Todos', () => {
  test('removes a todo when delete button is clicked', () => {
    renderTodoList();
    const deleteBtn = screen.getByTestId('delete-btn-1');

    fireEvent.click(deleteBtn);

    expect(screen.queryByText('Learn React Testing Library')).not.toBeInTheDocument();
  });

  test('does not remove other todos when one is deleted', () => {
    renderTodoList();
    const deleteBtn = screen.getByTestId('delete-btn-1');

    fireEvent.click(deleteBtn);

    expect(screen.getByText('Write unit tests with Jest')).toBeInTheDocument();
    expect(screen.getByText('Build a Todo List component')).toBeInTheDocument();
  });

  test('reduces list count by one after deletion', () => {
    renderTodoList();
    const deleteBtn = screen.getByTestId('delete-btn-2');

    fireEvent.click(deleteBtn);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  test('can delete all todos', () => {
    renderTodoList();
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });

    deleteButtons.forEach((btn) => fireEvent.click(btn));

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('can add a new todo after deleting all', () => {
    renderTodoList();
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    deleteButtons.forEach((btn) => fireEvent.click(btn));

    const input = screen.getByTestId('todo-input');
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Fresh start' } });
    fireEvent.click(addBtn);

    expect(screen.getByText('Fresh start')).toBeInTheDocument();
  });
});