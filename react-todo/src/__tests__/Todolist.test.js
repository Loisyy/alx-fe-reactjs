import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

// ─── Helper ────────────────────────────────────────────────────────────────────
// Renders the TodoList and returns useful query shortcuts
const renderTodoList = () => render(<TodoList />);

// ─── 1. Initial Render Tests ───────────────────────────────────────────────────
describe('TodoList — Initial Render', () => {
  test('renders the heading', () => {
    renderTodoList();
    expect(screen.getByText(/todo list/i)).toBeInTheDocument();
  });

  test('renders the add-todo input field', () => {
    renderTodoList();
    expect(
      screen.getByPlaceholderText(/what needs to be done/i)
    ).toBeInTheDocument();
  });

  test('renders the Add button', () => {
    renderTodoList();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  test('renders all three initial demo todos', () => {
    renderTodoList();
    expect(
      screen.getByText(/learn react testing library/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/write unit tests with jest/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/build a todo list component/i)
    ).toBeInTheDocument();
  });

  test('renders the correct "tasks remaining" counter on load', () => {
    renderTodoList();
    // 2 of 3 initial todos are not completed
    expect(screen.getByText(/2 tasks remaining/i)).toBeInTheDocument();
  });

  test('renders the total and completed count in the footer', () => {
    renderTodoList();
    expect(screen.getByText(/3 total/i)).toBeInTheDocument();
    expect(screen.getByText(/1 completed/i)).toBeInTheDocument();
  });
});

// ─── 2. Adding Todo Tests ──────────────────────────────────────────────────────
describe('TodoList — Adding Todos', () => {
  test('adds a new todo when the form is submitted with valid input', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Buy groceries' } });
    fireEvent.click(addBtn);

    expect(screen.getByText(/buy groceries/i)).toBeInTheDocument();
  });

  test('clears the input field after a successful submission', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Read a book' } });
    fireEvent.click(addBtn);

    expect(input).toHaveValue('');
  });

  test('increments the remaining tasks counter after adding a todo', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'New task' } });
    fireEvent.click(addBtn);

    // Was 2, now should be 3
    expect(screen.getByText(/3 tasks remaining/i)).toBeInTheDocument();
  });

  test('does NOT add a todo when the input is empty', () => {
    renderTodoList();
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addBtn);

    // Still only 3 items in the list
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('shows a validation error message when submitting an empty input', () => {
    renderTodoList();
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addBtn);

    expect(screen.getByRole('alert')).toHaveTextContent(
      /please enter a todo item/i
    );
  });

  test('does NOT add a todo consisting only of whitespace', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addBtn);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('adds a new todo when the form is submitted via the Enter key', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);

    fireEvent.change(input, { target: { value: 'Go for a run' } });
    fireEvent.submit(input.closest('form'));

    expect(screen.getByText(/go for a run/i)).toBeInTheDocument();
  });

  test('can add multiple todos in sequence', () => {
    renderTodoList();
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Task A' } });
    fireEvent.click(addBtn);
    fireEvent.change(input, { target: { value: 'Task B' } });
    fireEvent.click(addBtn);

    expect(screen.getByText(/task a/i)).toBeInTheDocument();
    expect(screen.getByText(/task b/i)).toBeInTheDocument();
  });
});

// ─── 3. Toggling Todos Tests ───────────────────────────────────────────────────
describe('TodoList — Toggling Todos', () => {
  test('toggles an incomplete todo to completed when clicked', () => {
    renderTodoList();
    // "Learn React Testing Library" starts as NOT completed
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: learn react testing library/i,
    });

    fireEvent.click(toggleBtn);

    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('toggles a completed todo back to incomplete when clicked again', () => {
    renderTodoList();
    // "Build a Todo List component" starts as completed (aria-pressed=true)
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: build a todo list component/i,
    });

    // It's already completed — click once to mark incomplete
    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
  });

  test('updates the remaining counter when a todo is toggled to completed', () => {
    renderTodoList();
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: learn react testing library/i,
    });

    // Before: 2 remaining
    expect(screen.getByText(/2 tasks remaining/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    // After: 1 remaining
    expect(screen.getByText(/1 task remaining/i)).toBeInTheDocument();
  });

  test('updates the remaining counter when a completed todo is toggled back', () => {
    renderTodoList();
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: build a todo list component/i,
    });

    // Before: 2 remaining (it is already completed)
    expect(screen.getByText(/2 tasks remaining/i)).toBeInTheDocument();

    fireEvent.click(toggleBtn);

    // After: 3 remaining
    expect(screen.getByText(/3 tasks remaining/i)).toBeInTheDocument();
  });

  test('initially completed todo has aria-pressed set to true', () => {
    renderTodoList();
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: build a todo list component/i,
    });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('initially incomplete todo has aria-pressed set to false', () => {
    renderTodoList();
    const toggleBtn = screen.getByRole('button', {
      name: /toggle: learn react testing library/i,
    });
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
  });
});

// ─── 4. Deleting Todos Tests ───────────────────────────────────────────────────
describe('TodoList — Deleting Todos', () => {
  test('removes a todo from the list when its delete button is clicked', () => {
    renderTodoList();
    const deleteBtn = screen.getByRole('button', {
      name: /delete: learn react testing library/i,
    });

    fireEvent.click(deleteBtn);

    expect(
      screen.queryByText(/learn react testing library/i)
    ).not.toBeInTheDocument();
  });

  test('does not remove other todos when one is deleted', () => {
    renderTodoList();
    const deleteBtn = screen.getByRole('button', {
      name: /delete: learn react testing library/i,
    });

    fireEvent.click(deleteBtn);

    expect(screen.getByText(/write unit tests with jest/i)).toBeInTheDocument();
    expect(
      screen.getByText(/build a todo list component/i)
    ).toBeInTheDocument();
  });

  test('reduces the list item count by one after deletion', () => {
    renderTodoList();
    const deleteBtn = screen.getByRole('button', {
      name: /delete: write unit tests with jest/i,
    });

    fireEvent.click(deleteBtn);

    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
  });

  test('updates the remaining counter after a non-completed todo is deleted', () => {
    renderTodoList();
    // "Learn React Testing Library" is not completed — deleting it should reduce counter
    const deleteBtn = screen.getByRole('button', {
      name: /delete: learn react testing library/i,
    });

    fireEvent.click(deleteBtn);

    expect(screen.getByText(/1 task remaining/i)).toBeInTheDocument();
  });

  test('can delete all todos and shows the empty state message', () => {
    renderTodoList();

    const deleteBtns = screen.getAllByRole('button', { name: /^delete:/i });
    deleteBtns.forEach((btn) => fireEvent.click(btn));

    expect(
      screen.getByText(/no todos yet — add one above/i)
    ).toBeInTheDocument();
  });

  test('can add a todo after all have been deleted', () => {
    renderTodoList();

    // Delete all
    const deleteBtns = screen.getAllByRole('button', { name: /^delete:/i });
    deleteBtns.forEach((btn) => fireEvent.click(btn));

    // Add a new one
    const input = screen.getByPlaceholderText(/what needs to be done/i);
    const addBtn = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(input, { target: { value: 'Fresh start' } });
    fireEvent.click(addBtn);

    expect(screen.getByText(/fresh start/i)).toBeInTheDocument();
  });
});