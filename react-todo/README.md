# react-todo

A fully functional **Todo List** application built with React, featuring add, toggle, and delete functionality. The project includes a comprehensive test suite written with **Jest** and **React Testing Library**, covering 26 test cases across all component behaviours.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
4. [Component Architecture](#component-architecture)
5. [File-by-File Breakdown](#file-by-file-breakdown)
   - [App.jsx](#appjsx)
   - [App.css](#appcss)
   - [TodoList.jsx](#todolistjsx)
   - [AddTodoForm.jsx](#addtodoformjsx)
   - [TodoItem.jsx](#todoitemjsx)
   - [TodoList.css](#todolistcss)
6. [State Management](#state-management)
   - [State Shape](#state-shape)
   - [addTodo](#addtodo)
   - [toggleTodo](#toggletodo)
   - [deleteTodo](#deletetodo)
7. [Testing Setup](#testing-setup)
   - [Why Jest + React Testing Library?](#why-jest--react-testing-library)
   - [Configuration Files](#configuration-files)
   - [jest.config.cjs](#jestconfigcjs)
   - [jest.setup.js](#jestsetupjs)
   - [.babelrc](#babelrc)
   - [__mocks__/styleMock.js](#mocksstylemockjs)
   - [__mocks__/fileMock.js](#mocksfilemockjs)
8. [Test Suite — Deep Dive](#test-suite--deep-dive)
   - [Test File Location](#test-file-location)
   - [1. Initial Render Tests](#1-initial-render-tests)
   - [2. Adding Todo Tests](#2-adding-todo-tests)
   - [3. Toggling Todo Tests](#3-toggling-todo-tests)
   - [4. Deleting Todo Tests](#4-deleting-todo-tests)
9. [Accessibility Design](#accessibility-design)
10. [Running the App](#running-the-app)
11. [Running the Tests](#running-the-tests)
12. [Test Coverage](#test-coverage)

---

## Getting Started

```bash
npm create vite@latest react-todo -- --template react
cd react-todo
npm install
npm install --save-dev jest @testing-library/react @testing-library/jest-dom \
  jest-environment-jsdom babel-jest @babel/preset-env @babel/preset-react
npm run dev      # start development server
npm test         # run test suite
```

---

## Project Structure

```
react-todo/
├── src/
│   ├── components/
│   │   ├── TodoList.jsx          ← Root todo component (state + handlers)
│   │   ├── AddTodoForm.jsx       ← Controlled input form for new todos
│   │   └── TodoItem.jsx          ← Single todo row (toggle + delete)
│   ├── styles/
│   │   └── TodoList.css          ← Styles for all todo components
│   ├── __tests__/
│   │   └── TodoList.test.js      ← 26 Jest + RTL tests
│   ├── App.jsx                   ← App entry point
│   └── App.css                   ← Global body and layout styles
├── __mocks__/
│   ├── styleMock.js              ← CSS import stub for Jest
│   └── fileMock.js               ← Static asset import stub for Jest
├── jest.config.cjs               ← Jest configuration
├── jest.setup.js                 ← jest-dom matcher registration
├── .babelrc                      ← Babel config for JSX transpilation
├── package.json                  ← Scripts and dependencies
└── vite.config.js                ← Vite dev server config
```

---

## Dependencies

### Runtime

| Package | Purpose |
|---|---|
| `react` | UI library — component rendering, hooks |
| `react-dom` | Mounts the React tree into the browser DOM |

### Development & Testing

| Package | Purpose |
|---|---|
| `vite` + `@vitejs/plugin-react` | Fast dev server and production build tool |
| `jest` | Test runner — discovers, executes, and reports on test files |
| `jest-environment-jsdom` | Simulated browser DOM for Jest (required for React component tests) |
| `@testing-library/react` | Utilities for rendering components and querying the DOM in tests |
| `@testing-library/jest-dom` | Custom `expect` matchers like `toBeInTheDocument`, `toHaveAttribute` |
| `babel-jest` | Transpiles JSX and modern JS so Jest (a Node.js tool) can understand React files |
| `@babel/preset-env` | Converts modern JS syntax to Node-compatible CommonJS |
| `@babel/preset-react` | Converts JSX (`<Component />`) into `React.createElement(...)` calls |

---

## Component Architecture

The app is built with a **three-component tree**. State lives entirely in the top-level `TodoList` component and flows down to children via props. No external state library is used.

```
App
└── TodoList          (state owner: todos[], handlers)
    ├── AddTodoForm   (receives: onAdd prop)
    └── ul
        └── TodoItem  (receives: todo, onToggle, onDelete props)
        └── TodoItem
        └── TodoItem
        ...
```

This structure follows the React principle of **lifting state up** — the shared data (`todos`) lives in the lowest common ancestor of all components that need it.

---

## File-by-File Breakdown

### `App.jsx`

The application entry point. Its only responsibility is to render `TodoList` inside a centred `div.app` container. It imports `App.css` for the global body background and layout styles.

```jsx
import TodoList from './components/TodoList';
import './App.css';

function App() {
  return (
    <div className="app">
      <TodoList />
    </div>
  );
}
```

`App` intentionally contains no logic. Keeping it thin means the `TodoList` component is independently renderable and testable without any wrapper setup.

---

### `App.css`

Sets the global page background to a soft purple-to-lavender gradient and centres the todo card both horizontally and vertically using flexbox. The `min-height: 100vh` ensures the gradient fills the entire viewport regardless of content height.

---

### `TodoList.jsx`

The **state owner and orchestrator** of the entire application. This is the most important component in the project.

#### Initial State

```jsx
const initialTodos = [
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Write unit tests with Jest', completed: false },
  { id: 3, text: 'Build a Todo List component', completed: true },
];

const [todos, setTodos] = useState(initialTodos);
```

Three demo todos are pre-loaded to give the app immediate content and to provide a realistic starting state for the tests. The third item begins as `completed: true` so the "completed" visual state is visible from the first render.

Each todo is an object with three fields:

| Field | Type | Description |
|---|---|---|
| `id` | `number` | Unique identifier. Uses `Date.now()` for new todos to guarantee uniqueness without a library. |
| `text` | `string` | The todo description displayed to the user. |
| `completed` | `boolean` | Whether the item has been checked off. Drives strikethrough styling and the counter. |

#### Derived UI Values

```jsx
const remaining = todos.filter((t) => !t.completed).length;
```

`remaining` is not stored in state — it is computed directly from `todos` on every render. This is intentional: storing derived values separately in state causes synchronisation bugs. Since `remaining` is always the count of incomplete items in `todos`, it is always correct by definition.

#### Rendered Output

- **Header** — displays the app title and the live `remaining` counter badge
- **`AddTodoForm`** — receives the `addTodo` function as the `onAdd` prop
- **Empty state** — a paragraph rendered when `todos.length === 0` (after deleting all items)
- **`<ul>` of `TodoItem`s** — each item receives its own `todo` object plus `onToggle` and `onDelete` handlers
- **Footer** — shows total count and completed count as a summary

---

### `AddTodoForm.jsx`

A **controlled form component** for capturing new todo text. It manages two pieces of its own local state:

```jsx
const [value, setValue] = useState('');   // current input text
const [error, setError] = useState('');   // validation error message
```

These are kept local to `AddTodoForm` because nothing outside this component needs to know about the draft text or the error state — they are purely form-level concerns.

#### Validation Logic

```jsx
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
```

`e.preventDefault()` stops the browser from reloading the page on form submission (default HTML form behaviour). `value.trim()` rejects inputs that consist entirely of spaces, since a whitespace-only todo is meaningless. On a valid submission:

1. `onAdd(value)` is called — this is the `addTodo` function passed down from `TodoList`
2. `setValue('')` clears the input field, ready for the next entry
3. `setError('')` clears any previous error message

The error message is rendered with `role="alert"`, which causes screen readers to announce it immediately when it appears — an important accessibility consideration.

#### Input Clearing Error on Change

```jsx
onChange={(e) => {
  setValue(e.target.value);
  if (error) setError('');
}}
```

As soon as the user starts typing after an error, the error message disappears. This avoids the confusing situation where an old error persists while the user is actively correcting their input.

---

### `TodoItem.jsx`

Renders a **single row** in the todo list. It receives three props: `todo` (the data object), `onToggle` (called when the row is clicked), and `onDelete` (called when the delete button is clicked).

```jsx
const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li
    className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}
    data-testid={`todo-item-${todo.id}`}
  >
    <button
      className="todo-toggle"
      onClick={() => onToggle(todo.id)}
      aria-label={`Toggle: ${todo.text}`}
      aria-pressed={todo.completed}
    >
      <span className="todo-checkbox">{todo.completed ? '✓' : ''}</span>
      <span className="todo-text">{todo.text}</span>
    </button>

    <button
      className="todo-delete"
      onClick={() => onDelete(todo.id)}
      aria-label={`Delete: ${todo.text}`}
    >
      ✕
    </button>
  </li>
);
```

#### Why buttons instead of checkboxes?

Both the toggle and delete controls are implemented as `<button>` elements rather than `<input type="checkbox">` and `<button>`. This is a deliberate design choice that simplifies test queries. React Testing Library encourages querying by accessible roles and labels — `getByRole('button', { name: /toggle: .../i })` is more expressive and resilient than a checkbox query.

#### `aria-pressed` attribute

The toggle button uses `aria-pressed={todo.completed}` — an ARIA attribute that communicates the binary on/off state of a toggle button to assistive technology. It also serves as the primary test assertion point: tests check `toHaveAttribute('aria-pressed', 'true')` or `'false'` to verify that toggling works correctly, rather than checking CSS classes (which could change without breaking functionality).

#### `aria-label` for unique identification

Both buttons include an `aria-label` that contains the todo's text:
- Toggle button: `"Toggle: Learn React Testing Library"`
- Delete button: `"Delete: Learn React Testing Library"`

This makes every button in the list uniquely queryable by name, even though there are multiple toggle and delete buttons on the page. Without these labels, `getByRole('button', { name: /delete/i })` would fail because multiple buttons would match.

#### `data-testid`

`data-testid={`todo-item-${todo.id}`}` is added to the `<li>` element as an escape hatch for situations where a query-by-role or query-by-text approach would be overly complex. It is not used in the current tests but is available for future assertions.

---

### `TodoList.css`

Styles all three todo components. Organised into clearly separated sections:

| Section | Description |
|---|---|
| `.todo-wrapper` | White rounded card with a drop shadow — the outer container |
| `.todo-header` | Purple gradient header bar with the title and remaining counter badge |
| `.add-todo-form` | Flex row input + button joined at the border to look like a single field |
| `.todo-list` | Unstyled `<ul>` reset |
| `.todo-item` | Full-width flex row with hover background |
| `.todo-toggle` | Full-width button (no visible border) acting as the clickable area for the text |
| `.todo-checkbox` | 22×22px rounded square that fills purple with a checkmark when `.todo-completed` is applied |
| `.todo-completed .todo-text` | Applies `text-decoration: line-through` and grey colour to completed item text |
| `.todo-delete` | Circular ghost button that turns red on hover |
| `.todo-footer` | Light grey summary bar at the bottom of the card |

---

## State Management

All application state lives in `TodoList.jsx` as a single `todos` array managed by `useState`. The three handler functions each use the **functional update form** of `setTodos` (passing a callback rather than a value) to avoid stale closure bugs in concurrent rendering.

### State Shape

```js
[
  { id: 1, text: 'Learn React Testing Library', completed: false },
  { id: 2, text: 'Write unit tests with Jest', completed: false },
  { id: 3, text: 'Build a Todo List component', completed: true },
]
```

### `addTodo`

```jsx
const addTodo = (text) => {
  const trimmed = text.trim();
  if (!trimmed) return;
  setTodos((prev) => [
    ...prev,
    { id: Date.now(), text: trimmed, completed: false },
  ]);
};
```

Whitespace trimming happens here as a **second line of defence** — `AddTodoForm` already prevents empty submissions, but `addTodo` guards itself independently so it remains safe to call from any context. The new todo is appended to the end of the array using the spread operator, preserving all existing items immutably. `Date.now()` produces a unique `id` without needing a counter variable or external library.

### `toggleTodo`

```jsx
const toggleTodo = (id) => {
  setTodos((prev) =>
    prev.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  );
};
```

`Array.map` returns a new array — the original is never mutated. Only the item whose `id` matches is changed; all others are returned as-is (same object reference). The spread `{ ...todo, completed: !todo.completed }` creates a new object with `completed` flipped, which is the correct immutable update pattern in React.

### `deleteTodo`

```jsx
const deleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
};
```

`Array.filter` returns a new array containing only the items that do **not** match the given `id`. Like `map`, it leaves the original array untouched. This is the simplest and most readable way to remove an item from a React state array.

---

## Testing Setup

### Why Jest + React Testing Library?

**Jest** is the standard test runner for JavaScript projects. It handles test discovery (files matching `*.test.js`), running tests in a Node.js environment, assertions (`expect`), mocking, and generating coverage reports.

**React Testing Library (RTL)** is built on the philosophy that tests should resemble how users interact with the UI, not how the code is implemented internally. Instead of accessing component state or calling methods directly, RTL tests:

- Render the component into a real (jsdom) DOM
- Query elements the way a user would find them — by text, role, label, or placeholder
- Simulate real user events — clicks, typing, form submissions
- Assert on what the user sees — visible text, attributes, presence or absence of elements

This approach means tests remain valid even when internal implementation details change. Refactoring a component's state structure or splitting it into sub-components will not break tests as long as the visible behaviour is preserved.

---

### Configuration Files

#### `jest.config.cjs`

```js
const config = {
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|sass|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: ['**/__tests__/**/*.test.{js,jsx}'],
  collectCoverageFrom: ['src/components/**/*.{js,jsx}'],
};
```

The file uses `.cjs` extension (CommonJS) because the project's `package.json` sets `"type": "module"`, which makes `.js` files default to ES modules. Jest runs in CommonJS mode, so the config file must be CommonJS — the `.cjs` extension overrides the module type for just this file.

| Option | Purpose |
|---|---|
| `testEnvironment: 'jsdom'` | Provides a simulated browser DOM (window, document, etc.) so React can render and tests can query the DOM |
| `setupFilesAfterFramework` | Runs `jest.setup.js` after the test framework is installed but before each test file — this is where `jest-dom` matchers are registered |
| `transform` | Tells Jest to run all `.js`, `.ts`, `.jsx`, `.tsx` files through `babel-jest` before executing them |
| `moduleNameMapper` | Intercepts CSS and image imports (which Node.js cannot understand) and replaces them with mock stubs |
| `testMatch` | Tells Jest to only look for test files inside `__tests__` directories |
| `collectCoverageFrom` | Scopes coverage reports to only the component files |

---

#### `jest.setup.js`

```js
import '@testing-library/jest-dom';
```

This single line extends Jest's `expect` with the custom matchers provided by `@testing-library/jest-dom`. Without this, calling `expect(element).toBeInTheDocument()` would throw `TypeError: expect(...).toBeInTheDocument is not a function`. The matchers added include:

- `toBeInTheDocument()` — element exists in the DOM
- `toHaveAttribute(attr, value)` — element has a specific attribute value
- `toHaveValue(value)` — input has a specific value
- `toHaveTextContent(text)` — element contains matching text

---

#### `.babelrc`

```json
{
  "presets": [
    ["@babel/preset-env", { "targets": { "node": "current" } }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

Vite uses esbuild to transform JSX for the browser — fast, but not compatible with Jest. Jest uses Babel for transformation. This config tells Babel:

- **`@babel/preset-env`** with `targets: { node: "current" }` — transpile only the JS features that the currently running Node.js version doesn't support natively (minimal transformation, faster tests)
- **`@babel/preset-react`** with `runtime: "automatic"` — transform JSX into React calls, and use the automatic JSX runtime (React 17+) so `import React from 'react'` is not required in every file

---

#### `__mocks__/styleMock.js`

```js
module.exports = {};
```

When Jest encounters `import '../styles/TodoList.css'`, it cannot execute CSS. The `moduleNameMapper` in `jest.config.cjs` intercepts all `.css` imports and redirects them to this file, which simply exports an empty object. Components that use CSS modules would receive an empty object for class lookups, and components that import plain CSS (as in this project) simply have the import ignored.

---

#### `__mocks__/fileMock.js`

```js
module.exports = 'test-file-stub';
```

Same principle as `styleMock.js` but for static assets (images, SVGs, icons). Jest redirects these imports to a stub string. Any code that uses `import logo from './logo.svg'` would receive the string `'test-file-stub'` in tests, which is harmless.

---

## Test Suite — Deep Dive

### Test File Location

```
src/__tests__/TodoList.test.js
```

Placing tests in a `__tests__` directory is a Jest convention. `jest.config.cjs` is configured with `testMatch: ['**/__tests__/**/*.test.{js,jsx}']` so Jest discovers this file automatically when `npm test` is run.

The test file imports:

```js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';
```

Only `TodoList` is imported — not `AddTodoForm` or `TodoItem`. This is **integration testing**: the full component tree (including its children) is rendered together, exactly as it appears in the real app. This means the tests verify that the components work correctly as a system, not just in isolation.

A helper function is defined at the top:

```js
const renderTodoList = () => render(<TodoList />);
```

This avoids repeating `render(<TodoList />)` in every test and makes the test file easier to read. Each test calls `renderTodoList()` independently, which means every test starts with a fresh, isolated component instance — no shared state between tests.

---

### 1. Initial Render Tests

**6 tests** — `describe('TodoList — Initial Render', ...)`

These tests verify the component's state before any user interaction. They establish the baseline that all other tests depend on.

| Test | Query method | What it checks |
|---|---|---|
| Renders the heading | `getByText(/todo list/i)` | The `<h1>` with "📝 Todo List" is present |
| Renders the input field | `getByPlaceholderText(...)` | The text input exists with the correct placeholder |
| Renders the Add button | `getByRole('button', { name: /add todo/i })` | The submit button is present and accessible |
| Renders all three demo todos | `getByText(...)` × 3 | Each initial todo's text is visible on screen |
| Correct remaining counter | `getByText(/2 tasks remaining/i)` | The header badge shows 2 (2 of 3 todos are incomplete) |
| Correct footer counts | `getByText(/3 total/i)` + `getByText(/1 completed/i)` | Footer accurately reflects the initial state |

The counter test (`2 tasks remaining`) is particularly important — it verifies that the derived `remaining` value is computed correctly from the initial `todos` array.

---

### 2. Adding Todo Tests

**8 tests** — `describe('TodoList — Adding Todos', ...)`

These tests verify every aspect of the add-todo flow using `fireEvent` to simulate user interactions.

#### Valid add — the core flow

```js
test('adds a new todo when the form is submitted with valid input', () => {
  renderTodoList();
  const input = screen.getByPlaceholderText(/what needs to be done/i);
  const addBtn = screen.getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'Buy groceries' } });
  fireEvent.click(addBtn);

  expect(screen.getByText(/buy groceries/i)).toBeInTheDocument();
});
```

`fireEvent.change` simulates the browser's `change` event, updating the input's value. `fireEvent.click` simulates a button click, which triggers form submission. After these events, the test asserts that the new todo text appears in the document.

#### Input cleared after submission

```js
expect(input).toHaveValue('');
```

Verifies that `setValue('')` in `AddTodoForm.handleSubmit` ran correctly — the input field is empty and ready for the next todo.

#### Counter incremented

```js
expect(screen.getByText(/3 tasks remaining/i)).toBeInTheDocument();
```

Before adding: 2 remaining. After adding a non-completed todo: 3 remaining. This verifies the counter updates in response to state changes.

#### Empty input rejected

```js
fireEvent.click(addBtn); // no prior input change
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(3); // still only 3 items
```

Clicking Add with no input text should not add anything. `getAllByRole('listitem')` returns all `<li>` elements — still 3, confirming the guard clause worked.

#### Validation error shown

```js
expect(screen.getByRole('alert')).toHaveTextContent(/please enter a todo item/i);
```

`role="alert"` is the ARIA role applied to the error paragraph in `AddTodoForm`. `getByRole('alert')` finds it, and `toHaveTextContent` confirms the correct message.

#### Whitespace-only rejected

```js
fireEvent.change(input, { target: { value: '   ' } });
fireEvent.click(addBtn);
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(3);
```

A string of spaces passes the falsy check (`'   '` is truthy) but fails the `trim()` check. This test confirms that `AddTodoForm` correctly uses `.trim()` before calling `onAdd`.

#### Enter key submits the form

```js
fireEvent.submit(input.closest('form'));
```

Simulates pressing Enter inside the input field by dispatching a submit event directly on the `<form>` element. Confirms that the form works correctly with keyboard-only navigation, not just mouse clicks.

#### Multiple sequential adds

Adds "Task A" then "Task B" in sequence and confirms both appear. This verifies that `setValue('')` correctly resets the input between submissions and that the state accumulates correctly across multiple updates.

---

### 3. Toggling Todo Tests

**6 tests** — `describe('TodoList — Toggling Todos', ...)`

These tests query toggle buttons by their `aria-label` and assert on the `aria-pressed` attribute to verify state changes.

#### Querying toggle buttons

```js
const toggleBtn = screen.getByRole('button', {
  name: /toggle: learn react testing library/i,
});
```

`getByRole('button', { name: ... })` matches a button whose accessible name matches the pattern. The accessible name comes from the `aria-label` attribute on the button in `TodoItem.jsx`. The `/i` flag makes the match case-insensitive.

#### Toggling incomplete → complete

```js
fireEvent.click(toggleBtn);
expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
```

After clicking an incomplete todo's toggle button, `aria-pressed` should be `'true'`. Note that `toHaveAttribute` compares string values — even though `aria-pressed` is set to a boolean in JSX (`aria-pressed={todo.completed}`), the DOM attribute is always a string.

#### Toggling complete → incomplete

```js
// "Build a Todo List component" starts completed
fireEvent.click(toggleBtn);
expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
```

Clicks the already-completed todo's toggle button and verifies it becomes incomplete.

#### Counter updates on toggle

Two tests verify the counter:
- Marking an incomplete item done: counter decreases from 2 to 1
- Marking a completed item undone: counter increases from 2 to 3

This tests that `remaining` (derived from `todos`) recomputes correctly after a state update.

#### Initial `aria-pressed` values

```js
// incomplete todo
expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');
// completed todo
expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');
```

These tests confirm the initial state is correctly reflected in the DOM attributes without any user interaction — verifying the component renders the correct initial `aria-pressed` values from the `initialTodos` array.

---

### 4. Deleting Todo Tests

**6 tests** — `describe('TodoList — Deleting Todos', ...)`

#### Querying delete buttons

```js
const deleteBtn = screen.getByRole('button', {
  name: /delete: learn react testing library/i,
});
```

Same pattern as toggle buttons — `aria-label="Delete: <text>"` makes each delete button uniquely identifiable.

#### Item removed from DOM

```js
fireEvent.click(deleteBtn);
expect(
  screen.queryByText(/learn react testing library/i)
).not.toBeInTheDocument();
```

`queryByText` (note: `query`, not `get`) is used here intentionally. `getByText` throws if the element is not found — useful when you expect something to be present. `queryByText` returns `null` if not found — necessary when asserting absence. `.not.toBeInTheDocument()` confirms the deleted todo is gone.

#### Other todos unaffected

```js
expect(screen.getByText(/write unit tests with jest/i)).toBeInTheDocument();
expect(screen.getByText(/build a todo list component/i)).toBeInTheDocument();
```

After deleting one todo, the other two must still be present. This verifies that `deleteTodo` uses `filter` correctly — only removing the matching item.

#### List count reduced

```js
const items = screen.getAllByRole('listitem');
expect(items).toHaveLength(2);
```

`getAllByRole('listitem')` returns all `<li>` elements. After deleting one of three, exactly two should remain.

#### Counter updated after deleting incomplete todo

Deletes "Learn React Testing Library" (which is incomplete) and verifies the remaining counter drops from 2 to 1.

#### Delete all → empty state

```js
const deleteBtns = screen.getAllByRole('button', { name: /^delete:/i });
deleteBtns.forEach((btn) => fireEvent.click(btn));
expect(screen.getByText(/no todos yet — add one above/i)).toBeInTheDocument();
```

`getAllByRole` with `name: /^delete:/i` (starts with "delete:") collects all three delete buttons. Clicking each one simulates deleting all todos, after which the empty state message should appear. This tests the conditional render in `TodoList`:

```jsx
{todos.length === 0 ? (
  <p className="todo-empty">No todos yet — add one above!</p>
) : (
  <ul>...</ul>
)}
```

#### Add after deleting all

Deletes everything then adds a new todo to verify the component recovers correctly from the empty state. This tests that `addTodo` still works correctly when starting from an empty array.

---

## Accessibility Design

The app is built with accessibility in mind from the ground up, which also makes it easier to test:

- **`aria-label`** on toggle and delete buttons provides unique, descriptive names for each interactive element
- **`aria-pressed`** on toggle buttons communicates binary state to screen readers and serves as the primary toggle assertion in tests
- **`role="alert"`** on the validation error message causes screen readers to announce it immediately
- **`noValidate`** on the form disables native browser validation UI (since custom validation is implemented)
- **`aria-label="New todo input"`** on the text input provides an accessible label (in addition to the placeholder)
- **`aria-label="todo list"`** on the `<ul>` element labels the list for assistive technology

---

## Running the App

```bash
npm run dev
```

Opens the development server at [http://localhost:5173](http://localhost:5173).

---

## Running the Tests

```bash
npm test
```

Runs all 26 tests. Expected output:

```
PASS  src/__tests__/TodoList.test.js
  TodoList — Initial Render
    ✓ renders the heading
    ✓ renders the add-todo input field
    ✓ renders the Add button
    ✓ renders all three initial demo todos
    ✓ renders the correct "tasks remaining" counter on load
    ✓ renders the total and completed count in the footer

  TodoList — Adding Todos
    ✓ adds a new todo when the form is submitted with valid input
    ✓ clears the input field after a successful submission
    ✓ increments the remaining tasks counter after adding a todo
    ✓ does NOT add a todo when the input is empty
    ✓ shows a validation error message when submitting an empty input
    ✓ does NOT add a todo consisting only of whitespace
    ✓ adds a new todo when the form is submitted via the Enter key
    ✓ can add multiple todos in sequence

  TodoList — Toggling Todos
    ✓ toggles an incomplete todo to completed when clicked
    ✓ toggles a completed todo back to incomplete when clicked again
    ✓ updates the remaining counter when a todo is toggled to completed
    ✓ updates the remaining counter when a completed todo is toggled back
    ✓ initially completed todo has aria-pressed set to true
    ✓ initially incomplete todo has aria-pressed set to false

  TodoList — Deleting Todos
    ✓ removes a todo from the list when its delete button is clicked
    ✓ does not remove other todos when one is deleted
    ✓ reduces the list item count by one after deletion
    ✓ updates the remaining counter after a non-completed todo is deleted
    ✓ can delete all todos and shows the empty state message
    ✓ can add a todo after all have been deleted

Test Suites: 1 passed, 1 total
Tests:       26 passed, 26 total
```

---

## Test Coverage

```bash
npm run test:coverage
```

Generates a coverage report for all files under `src/components/`. Coverage tracks which lines, branches, functions, and statements were executed during the test run.

| File | Statements | Branches | Functions | Lines |
|---|---|---|---|---|
| `TodoList.jsx` | 100% | 100% | 100% | 100% |
| `AddTodoForm.jsx` | 100% | 100% | 100% | 100% |
| `TodoItem.jsx` | 100% | 100% | 100% | 100% |