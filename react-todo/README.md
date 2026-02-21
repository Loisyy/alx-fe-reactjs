# react-todo

A fully tested **Todo List** application built with React and Vite. Features add, toggle, and delete functionality with a live statistics bar. Tested with **Jest** and **React Testing Library** across 6 comprehensive test cases.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Components](#components)
   - [TodoList](#todolist)
   - [AddTodoForm](#addtodoform)
   - [TodoItem](#todoitem)
4. [State Management](#state-management)
5. [Data Flow](#data-flow)
6. [Testing](#testing)
   - [Setup](#setup)
   - [Test Cases](#test-cases)
   - [Running Tests](#running-tests)
7. [data-testid Reference](#data-testid-reference)

---

## Getting Started

```bash
# Install dependencies
npm install

# Install testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom \
  jest-environment-jsdom babel-jest @babel/preset-env @babel/preset-react

# Start development server
npm run dev

# Run tests
npm test
```

---

## Project Structure

```
react-todo/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx          ← Root component, owns all state
│   │   ├── TodoList.test.js      ← 6 test cases (Jest + RTL)
│   │   ├── AddTodoForm.jsx       ← Controlled input form
│   │   └── TodoItem.jsx          ← Single todo row
│   ├── App.jsx
│   └── main.jsx
├── jest.config.cjs
├── jest.setup.js
├── .babelrc
└── package.json
```

---

## Components

### `TodoList`

**File:** `src/components/TodoList.jsx`

The root component and single source of truth for the entire application. It owns the `todos` array in state and defines all three handler functions, which it passes down to children as props.

**Initial state:**

```js
const [todos, setTodos] = useState([
  { id: 1, text: 'Learn React',      completed: false },
  { id: 2, text: 'Build a Todo App', completed: true  },
  { id: 3, text: 'Write Tests',      completed: false },
]);
```

Each todo object has three fields:

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier. Initial todos use `1`, `2`, `3`. New todos use `Date.now()`. |
| `text` | `string` | The todo description shown to the user. |
| `completed` | `boolean` | Whether the item is done. Drives strikethrough style and stats counter. |

**Rendered output:**

- An `<h1>Todo List</h1>` heading
- The `<AddTodoForm>` component receiving `onAdd={addTodo}`
- A `<ul>` mapping each todo to a `<TodoItem>` with `onToggle` and `onDelete` props
- A stats `<p>` showing Total, Completed, and Pending counts — all derived live from the `todos` array on every render

**Key `data-testid` attributes:**

| Element | `data-testid` |
|---|---|
| Outer `<div>` | `todo-list` |
| Stats `<p>` | `todo-count` |

---

### `AddTodoForm`

**File:** `src/components/AddTodoForm.jsx`

A controlled form component responsible only for capturing new todo text. It manages its own local `input` state — appropriate because no other component needs to know about the draft text while the user is typing.

```jsx
const [input, setInput] = useState('');
```

**Submit logic:**

```js
const handleSubmit = (e) => {
  e.preventDefault();
  if (input.trim()) {       // guard: reject empty or whitespace-only input
    onAdd(input.trim());    // call parent's addTodo with the trimmed text
    setInput('');           // clear the field ready for the next entry
  }
};
```

`e.preventDefault()` stops the browser's default form submission behaviour (which would reload the page). `input.trim()` is falsy for empty strings and whitespace-only strings, so clicking Add with nothing typed does nothing — the todo count stays unchanged.

**Key `data-testid` attributes:**

| Element | `data-testid` |
|---|---|
| `<form>` | `add-todo-form` |
| `<input>` | `todo-input` |
| Submit `<button>` | `add-btn` |

---

### `TodoItem`

**File:** `src/components/TodoItem.jsx`

Renders a single row in the list. Receives three props: the `todo` object, `onToggle`, and `onDelete`. It is a purely presentational component — it owns no state, just renders data and calls callbacks on user interaction.

**Toggle behaviour:** Clicking the `<span>` containing the todo text calls `onToggle(todo.id)`. Visual feedback is applied two ways — the `style` prop applies `text-decoration: line-through` and the `<li>` receives the CSS class `completed`:

```jsx
<li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
  <span
    onClick={() => onToggle(todo.id)}
    style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
  >
    {todo.text}
  </span>
```

The test suite uses the `completed` class (not the inline style) as its toggle assertion — `toHaveClass('completed')` — because class-based assertions reflect the semantic state more cleanly.

**Delete behaviour:** Clicking the Delete button calls `onDelete(todo.id)`, which filters the todo out of the parent's state array. The `aria-label={`Delete ${todo.text}`}` attribute ensures screen readers announce the specific item being deleted rather than a generic "Delete".

**Key `data-testid` attributes:**

| Element | `data-testid` |
|---|---|
| `<li>` | `todo-item-{id}` e.g. `todo-item-1` |
| Delete `<button>` | `delete-btn-{id}` e.g. `delete-btn-1` |

---

## State Management

All application state lives in `TodoList` as a single `todos` array. No external library is used. The three handler functions cover every possible state transition:

### `addTodo(text)`

```js
const addTodo = (text) => {
  const newTodo = { id: Date.now(), text, completed: false };
  setTodos([...todos, newTodo]);
};
```

Creates a new todo object and appends it using the spread operator. `Date.now()` produces a millisecond timestamp — unique enough for a client-side list without needing a UUID library. The original array is never mutated; a new array is always returned.

### `toggleTodo(id)`

```js
const toggleTodo = (id) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};
```

`Array.map` returns a new array. Only the matching item gets a new object with `completed` flipped via `!todo.completed`; every other item is returned as-is (same object reference). React detects the new array reference and re-renders.

### `deleteTodo(id)`

```js
const deleteTodo = (id) => {
  setTodos(todos.filter(todo => todo.id !== id));
};
```

`Array.filter` returns a new array containing only items that do **not** match the given `id`. The deleted item is gone from state immediately, causing React to remove the corresponding `<TodoItem>` from the DOM.

---

## Data Flow

```
TodoList  (state: todos[])
│
├── addTodo  ──────────► AddTodoForm  (prop: onAdd)
│                              │
│                         user types → handleSubmit → onAdd(text)
│
├── toggleTodo ──────────► TodoItem  (prop: onToggle)
│                              │
│                         user clicks span → onToggle(id)
│
├── deleteTodo ──────────► TodoItem  (prop: onDelete)
│                              │
│                         user clicks Delete → onDelete(id)
│
└── derived stats ──── todos.length
                   ──── todos.filter(t => t.completed).length
                   ──── todos.filter(t => !t.completed).length
```

State flows **down** via props. Events flow **up** via callback props. `AddTodoForm` and `TodoItem` own no shared state — they are completely driven by what `TodoList` passes them. The stats bar is never stored in state; it is computed from `todos` on every render, so it is always automatically correct.

---

## Testing

### Setup

The test suite uses **Jest** as the test runner and **React Testing Library (RTL)** to render components and interact with them the way a real user would — querying the DOM by visible text, roles, and `data-testid` attributes rather than internal implementation details like component state or class names.

**Key config files:**

| File | Purpose |
|---|---|
| `jest.config.cjs` | Sets `testEnvironment: 'jsdom'`, maps CSS imports to stubs, registers setup file |
| `jest.setup.js` | Imports `@testing-library/jest-dom` to add custom matchers like `toBeInTheDocument` |
| `.babelrc` | Configures Babel presets so Jest can process JSX (Vite uses esbuild; Jest needs Babel) |

**Testing philosophy:** Tests import and render `TodoList` — the root component — rather than individual sub-components. This means `AddTodoForm` and `TodoItem` are tested through `TodoList` as a complete integrated system, matching how the app actually runs in the browser.

---

### Test Cases

**File:** `src/components/TodoList.test.js`

---

#### 1. `renders initial todos`

Verifies the component's state before any user interaction.

```js
expect(screen.getByTestId('todo-list')).toBeInTheDocument();
expect(screen.getByText('Learn React')).toBeInTheDocument();
expect(screen.getByText('Build a Todo App')).toBeInTheDocument();
expect(screen.getByText('Write Tests')).toBeInTheDocument();
expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
expect(screen.getByTestId('todo-input')).toBeInTheDocument();
expect(screen.getByTestId('add-btn')).toBeInTheDocument();
```

Checks the container, all three initial todo texts, the form, the input, and the button are all present on first render.

---

#### 2. `adds a new todo`

Simulates typing into the input and clicking Add.

```js
fireEvent.change(input, { target: { value: 'New Test Todo' } });
fireEvent.click(addButton);

expect(screen.getByText('New Test Todo')).toBeInTheDocument();
expect(input.value).toBe('');
```

After clicking Add, the new text must appear in the list **and** the input must be empty. The cleared input verifies `setInput('')` ran inside `AddTodoForm.handleSubmit`.

---

#### 3. `does not add empty todo`

Verifies the guard clause `if (input.trim())` inside `AddTodoForm`.

```js
const initialCount = screen.getAllByRole('listitem').length; // 3
fireEvent.click(addButton); // no typing beforehand
expect(screen.getAllByRole('listitem').length).toBe(initialCount); // still 3
```

Clicking Add without typing must not change the list. `getAllByRole('listitem')` returns all `<li>` elements — the count must remain 3.

---

#### 4. `toggles todo completion`

Verifies the CSS class toggle and its reversibility.

```js
const todoItem = screen.getByText('Learn React').closest('li');

expect(todoItem).not.toHaveClass('completed'); // starts incomplete
fireEvent.click(todoText);
expect(todoItem).toHaveClass('completed');      // now complete
fireEvent.click(todoText);
expect(todoItem).not.toHaveClass('completed'); // toggled back
```

`.closest('li')` walks up the DOM from the `<span>` to its parent `<li>`, where the `completed` class is applied by `TodoItem`. Clicking twice verifies the toggle works in both directions — not just one way.

---

#### 5. `deletes a todo`

Verifies that clicking a delete button removes exactly that todo and reduces the count.

```js
const initialCount = screen.getAllByRole('listitem').length; // 3
fireEvent.click(screen.getByTestId('delete-btn-1'));

expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
expect(screen.getAllByRole('listitem').length).toBe(initialCount - 1); // 2
```

`queryByText` (not `getByText`) is used for the absence check — `getByText` throws if the element is missing, whereas `queryByText` returns `null`, which `.not.toBeInTheDocument()` can assert on safely.

---

#### 6. `displays correct todo statistics`

The most comprehensive test — verifies the stats counter stays accurate through a full sequence of add → toggle → delete operations.

```
Initial state:    Total: 3 | Completed: 1 | Pending: 2
After adding:     Total: 4 | Completed: 1 | Pending: 3
After toggling:   Total: 4 | Completed: 2 | Pending: 2
After deleting:   Total: 3 | Completed: 1 | Pending: 2
```

This confirms that the three derived values — `todos.length`, `filter(t => t.completed).length`, and `filter(t => !t.completed).length` — all recompute correctly after every state change. Since they are calculated from `todos` directly in the JSX on every render, they are always automatically in sync.

---

### Running Tests

```bash
# Run all tests once
npm test

# Run in watch mode (re-runs on file save during development)
npm test -- --watch

# Generate a coverage report
npm test -- --coverage
```

**Expected output:**

```
PASS  src/components/TodoList.test.js
  TodoList Component
    ✓ renders initial todos
    ✓ adds a new todo
    ✓ does not add empty todo
    ✓ toggles todo completion
    ✓ deletes a todo
    ✓ displays correct todo statistics

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
```

---

## `data-testid` Reference

Complete map of all `data-testid` attributes across the component tree and which tests use them.

| Component | Element | `data-testid` | Tests that query it |
|---|---|---|---|
| `TodoList` | Outer `<div>` | `todo-list` | renders initial todos |
| `TodoList` | Stats `<p>` | `todo-count` | displays correct todo statistics |
| `AddTodoForm` | `<form>` | `add-todo-form` | renders initial todos |
| `AddTodoForm` | `<input>` | `todo-input` | adds a new todo, does not add empty todo, displays stats |
| `AddTodoForm` | Submit `<button>` | `add-btn` | adds a new todo, does not add empty todo, displays stats |
| `TodoItem` | `<li>` | `todo-item-{id}` | — (queried via `.closest('li')` in toggle test) |
| `TodoItem` | Delete `<button>` | `delete-btn-{id}` | deletes a todo, displays correct stats |