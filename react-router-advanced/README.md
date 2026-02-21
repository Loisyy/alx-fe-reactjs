# react-router-advanced

A React application demonstrating advanced routing techniques using **React Router v6**, including nested routes, protected routes with authentication, and dynamic routing with URL parameters.

---

## Getting Started

```bash
npm create vite@latest react-router-advanced -- --template react
cd react-router-advanced
npm install react-router-dom
npm run dev
```

---

## Project Structure

```
src/
├── context/
│   └── AuthContext.jsx
├── components/
│   ├── ProtectedRoute.jsx
│   └── Navbar.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── ProfileDetails.jsx
│   ├── ProfileSettings.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   └── NotFound.jsx
├── App.jsx
└── App.css
```

---

## File-by-File Explanation

### `src/App.jsx`

The root component and the single source of truth for all route definitions. It wraps the entire app in three providers:

- **`AuthProvider`** — makes authentication state available to every component in the tree
- **`BrowserRouter`** — enables client-side routing using the browser's History API
- **`Routes` / `Route`** — declares the URL-to-component mapping

**Routes configured here:**

| Path | Component | Type |
|---|---|---|
| `/` | `Home` | Public |
| `/login` | `Login` | Public |
| `/blog` | `Blog` | Public |
| `/blog/:id` | `BlogPost` | Dynamic |
| `/profile` | `Profile → ProfileDetails` | Protected + Nested (index) |
| `/profile/settings` | `Profile → ProfileSettings` | Protected + Nested |
| `*` | `NotFound` | Catch-all |

The `Profile` route is wrapped in `<ProtectedRoute>` and contains child routes inside its own `<Route>` block, enabling the nested layout pattern.

---

### `src/App.css`

Global stylesheet for the entire application. Organised into clearly commented sections:

- **Reset** — strips browser default margins and box-sizing
- **Navbar** — sticky top bar with active link highlighting
- **Buttons** — reusable `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-logout`, `.btn-ghost` classes
- **Pages** — base `.page` container with max-width and padding
- **Home** — hero banner gradient and feature card grid
- **Auth / Login** — centred card layout with form group styles
- **Blog list** — post card grid with hover effects
- **Blog article** — full post layout with metadata and pull-quote style excerpt
- **Profile layout** — two-column flex layout (sticky sidebar + content area)
- **Nested pages** — detail rows, settings toggles, and badge styles
- **Not Found** — large decorative 404 code and centred message
- **Responsive** — mobile breakpoints at 700px for navbar and profile layout

---

### `src/context/AuthContext.jsx`

Creates and exports a global **authentication context** using React's `createContext` and `useContext` APIs.

**What it provides:**

- `currentUser` — an object `{ username, id }` when logged in, or `null` when logged out
- `login(username)` — sets `currentUser`, simulating a successful authentication
- `logout()` — resets `currentUser` to `null`

**`AuthProvider`** wraps the app in `App.jsx` so that any component anywhere in the tree can call `useAuth()` to read or update the auth state without prop drilling.

**`useAuth()`** is a custom hook exported for convenient access to the context value.

> **Note:** This is a simulated authentication system — any non-empty credentials are accepted. In a real application, `login()` would call an API and store a JWT or session token.

---

### `src/components/ProtectedRoute.jsx`

A **route guard** component that sits between the router and any page that requires the user to be logged in.

**How it works:**

1. Reads `currentUser` from `AuthContext` via `useAuth()`
2. Reads the current URL from `useLocation()`
3. If `currentUser` is `null` (not logged in), it renders a `<Navigate>` to `/login`, passing the original URL in `location.state.from` so the Login page knows where to redirect after a successful login
4. If `currentUser` exists, it renders the `children` (the protected page) as normal

**Usage in `App.jsx`:**
```jsx
<Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
>
```

---

### `src/components/Navbar.jsx`

The persistent top navigation bar rendered on every page. It uses React Router's **`NavLink`** (instead of plain `Link`) so that the currently active route automatically gets an `active` CSS class for visual highlighting.

**Key behaviours:**

- **Unauthenticated users** see: Home, Blog, Login
- **Authenticated users** see: Home, Blog, Profile, and a Logout button that shows the current username
- Logout calls `logout()` from `AuthContext` and then uses `useNavigate()` to redirect the user to the home page programmatically

---

### `src/pages/Home.jsx`

The landing page at `/`. It reads `currentUser` from `AuthContext` to conditionally render either a **"Login to Access Profile"** or a **"My Profile"** button in the hero section, giving users a clear call-to-action depending on their auth state.

Below the hero, three **feature cards** describe and link to each of the three routing concepts demonstrated in the app — nested routes, dynamic routing, and protected routes.

---

### `src/pages/Login.jsx`

The authentication page at `/login`.

**Key features:**

- Reads `location.state.from` (set by `ProtectedRoute`) to show a contextual notice like *"You must be logged in to visit /profile"*
- On form submission, validates that both fields are non-empty, then calls `login(username)` from `AuthContext`
- After a successful login, uses `navigate(from, { replace: true })` to send the user back to the page they originally tried to visit — or to `/` as a fallback
- The `replace: true` option prevents the login page from appearing in the browser history, so the Back button behaves correctly

---

### `src/pages/Profile.jsx`

The **layout component** for the nested `/profile` route group. It does not render page content directly — instead it provides a shared shell (sidebar + content area) and uses React Router's **`<Outlet />`** component as a placeholder where child routes render.

**Nested route structure:**

```
/profile          → renders ProfileDetails inside the Outlet (index route)
/profile/settings → renders ProfileSettings inside the Outlet
```

The sidebar contains:
- A generated avatar (first letter of the username)
- Username and join date
- Sub-navigation links using `NavLink` to `/profile` and `/profile/settings`
- A Logout button

Because `Profile` is wrapped in `<ProtectedRoute>` in `App.jsx`, both child routes are automatically protected — no need to wrap each one individually.

---

### `src/pages/ProfileDetails.jsx`

The **index child route** that renders at `/profile` (when no sub-path is specified). It displays the authenticated user's account information in a structured detail card, including username, user ID, account status, role, and a derived email address.

It also renders a green **route info badge** explaining that this is a nested index route, making the routing concept visible in the UI for learning purposes.

---

### `src/pages/ProfileSettings.jsx`

The **child route** that renders at `/profile/settings`. It displays a settings panel with four toggleable preferences — Email Notifications, Dark Mode, Newsletter, and Two-Factor Auth — managed with local `useState`.

A "Save Changes" button simulates a save action and shows a confirmation message for 3 seconds. Like `ProfileDetails`, it includes a route info badge explaining that it is a nested child route rendered inside the Profile layout's `<Outlet />`.

---

### `src/pages/Blog.jsx`

The blog listing page at `/blog`. It exports two things:

- **`POSTS`** — an array of 6 blog post objects (exported so `BlogPost.jsx` can reuse it for data lookup without duplicating the array or making an API call)
- **`Blog` (default export)** — the page component that renders all posts as clickable `<Link>` cards

Each card links to `/blog/:id`, which is the dynamic route. Clicking a card demonstrates how a single route definition handles multiple distinct URLs.

---

### `src/pages/BlogPost.jsx`

The individual blog post page at `/blog/:id`. This file demonstrates **dynamic routing** — the most important concept being the use of **`useParams()`** to extract the `id` segment from the URL.

**How it works:**

1. `const { id } = useParams()` reads the dynamic segment from the current URL
2. `POSTS.find(p => p.id === Number(id))` looks up the matching post from the shared data array
3. If no post matches, a **404 not-found** state is rendered with a back link
4. If found, the full article is rendered along with previous/next navigation links
5. `useNavigate()` powers the **"← Go Back"** button, calling `navigate(-1)` to step back in browser history

---

### `src/pages/NotFound.jsx`

The **catch-all route** rendered when no other route matches (configured with `path="*"` in `App.jsx`). It displays a large decorative `404` and a button to return to the home page. This ensures users always see a helpful page rather than a blank screen when visiting an invalid URL.

---

## Routing Concepts Summary

| Concept | Files Involved | React Router APIs Used |
|---|---|---|
| Basic routing | `App.jsx`, all pages | `BrowserRouter`, `Routes`, `Route` |
| Navigation | `Navbar.jsx`, `BlogPost.jsx`, `Login.jsx` | `Link`, `NavLink`, `useNavigate` |
| Nested routes | `App.jsx`, `Profile.jsx`, `ProfileDetails.jsx`, `ProfileSettings.jsx` | `Outlet`, nested `<Route>` |
| Dynamic routing | `Blog.jsx`, `BlogPost.jsx` | `useParams`, `:id` path segment |
| Protected routes | `ProtectedRoute.jsx`, `Login.jsx` | `Navigate`, `useLocation`, `state.from` |
| Auth state | `AuthContext.jsx` | `createContext`, `useContext`, `useState` |
| 404 handling | `NotFound.jsx` | `path="*"` catch-all |