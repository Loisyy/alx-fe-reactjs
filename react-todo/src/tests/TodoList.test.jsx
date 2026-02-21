import React from 'react';
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
});