import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {

  // ── Initial Render ───────────────────────────────────────────────────────────
  describe('Initial Render', () => {
    test('renders the heading', () => {
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

    test('renders all initial todo items', () => {
      render(<TodoList />);
      expect(screen.getByText('Learn React Testing Library')).toBeInTheDocument();
      expect(screen.getByText('Write unit tests with Jest')).toBeInTheDocument();
      expect(screen.getByText('Build a Todo List component')).toBeInTheDocument();
    });

    test('renders the todo list container', () => {
      render(<TodoList />);
      expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });
  });

  // ── Adding Todos ─────────────────────────────────────────────────────────────
  describe('Adding Todos', () => {
    test('adds a new todo when form is submitted', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');
      const addBtn = screen.getByRole('button', { name: /add todo/i });

      fireEvent.change(input, { target: { value: 'Buy groceries' } });
      fireEvent.click(addBtn);

      expect(screen.getByText('Buy groceries')).toBeInTheDocument();
    });

    test('clears the input after adding a todo', () => {
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

    test('adds a todo on form submit (Enter key)', () => {
      render(<TodoList />);
      const input = screen.getByTestId('todo-input');

      fireEvent.change(input, { target: { value: 'Go for a run' } });
      fireEvent.submit(input.closest('form'));

      expect(screen.getByText('Go for a run')).toBeInTheDocument();
    });

    test('can add multiple todos in sequence', () => {
      render(<TodoList />);
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

  // ── Toggling Todos ───────────────────────────────────────────────────────────
  describe('Toggling Todos', () => {
    test('toggles a todo to completed on click', () => {
      render(<TodoList />);
      const todoText = screen.getByText('Learn React Testing Library');

      fireEvent.click(todoText);

      expect(todoText).toHaveStyle('text-decoration: line-through');
    });

    test('toggles a completed todo back to incomplete', () => {
      render(<TodoList />);
      // "Build a Todo List component" starts completed
      const todoText = screen.getByText('Build a Todo List component');

      fireEvent.click(todoText);

      expect(todoText).toHaveStyle('text-decoration: none');
    });

    test('does not affect other todos when one is toggled', () => {
      render(<TodoList />);
      const firstTodo = screen.getByText('Learn React Testing Library');
      const secondTodo = screen.getByText('Write unit tests with Jest');

      fireEvent.click(firstTodo);

      expect(firstTodo).toHaveStyle('text-decoration: line-through');
      expect(secondTodo).toHaveStyle('text-decoration: none');
    });

    test('initially completed todo shows line-through', () => {
      render(<TodoList />);
      expect(screen.getByText('Build a Todo List component')).toHaveStyle(
        'text-decoration: line-through'
      );
    });

    test('initially incomplete todo shows no line-through', () => {
      render(<TodoList />);
      expect(screen.getByText('Learn React Testing Library')).toHaveStyle(
        'text-decoration: none'
      );
    });
  });

  // ── Deleting Todos ───────────────────────────────────────────────────────────
  describe('Deleting Todos', () => {
    test('removes a todo when delete is clicked', () => {
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

    test('reduces list count by one after deletion', () => {
      render(<TodoList />);
      fireEvent.click(screen.getByTestId('delete-btn-2'));
      expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });

    test('can delete all todos', () => {
      render(<TodoList />);
      const deleteBtns = screen.getAllByRole('button', { name: /delete/i });
      deleteBtns.forEach((btn) => fireEvent.click(btn));
      expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
    });

    test('can add a todo after deleting all', () => {
      render(<TodoList />);
      const deleteBtns = screen.getAllByRole('button', { name: /delete/i });
      deleteBtns.forEach((btn) => fireEvent.click(btn));

      const input = screen.getByTestId('todo-input');
      fireEvent.change(input, { target: { value: 'Fresh start' } });
      fireEvent.click(screen.getByRole('button', { name: /add todo/i }));

      expect(screen.getByText('Fresh start')).toBeInTheDocument();
    });
  });

});