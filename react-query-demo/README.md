# react-query-demo

A React application demonstrating advanced data fetching and state management using **React Query (TanStack Query v3)**. The app fetches posts from the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/posts), showcasing caching, background refetching, on-demand updates, search filtering, and pagination — all with zero manual loading state boilerplate.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Dependencies](#dependencies)
4. [How React Query Works](#how-react-query-works)
5. [App.jsx — QueryClient Setup](#appjsx--queryclient-setup)
6. [PostsComponent.jsx — Deep Dive](#postscomponentjsx--deep-dive)
   - [The API Fetcher Function](#the-api-fetcher-function)
   - [useQuery Hook](#usequery-hook)
   - [Query States Explained](#query-states-explained)
   - [Caching Strategy](#caching-strategy)
   - [On-Demand Refetching](#on-demand-refetching)
   - [Search Filtering](#search-filtering)
   - [Pagination](#pagination)
   - [The Cache Info Banner](#the-cache-info-banner)
7. [React Query DevTools](#react-query-devtools)
8. [Data Flow Diagram](#data-flow-diagram)
9. [Key React Query Concepts Demonstrated](#key-react-query-concepts-demonstrated)
10. [Testing the Cache Manually](#testing-the-cache-manually)

---

## Getting Started

```bash
npm create vite@latest react-query-demo -- --template react
cd react-query-demo
npm install react-query
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

---

## Project Structure

```
react-query-demo/
├── src/
│   ├── components/
│   │   └── PostsComponent.jsx   ← Main data-fetching component
│   ├── App.jsx                  ← QueryClient setup and provider
│   └── App.css                  ← Global styles
├── package.json
└── vite.config.js
```

---

## Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` | Core React library |
| `react-query` | Server-state management, caching, and data fetching |
| `vite` + `@vitejs/plugin-react` | Development server and build tool |

> **Note:** This project uses React Query **v3** (`react-query`). Version 4+ is published under `@tanstack/react-query` with minor API differences. The core concepts demonstrated here apply equally to both versions.

---

## How React Query Works

React Query is a **server-state management library**. Unlike `useState` or Redux, which manage client-side UI state, React Query manages the lifecycle of data that lives on a remote server — handling fetching, caching, background synchronisation, and updates automatically.

The two foundational concepts are:

**QueryClient** — a central cache and configuration store. There is one per application, created once and passed to every component through a context provider.

**useQuery** — a hook used inside any component that needs remote data. You give it a unique key and a fetch function, and it returns the current state of that data (loading, error, success, stale, etc.) along with the data itself.

---

## App.jsx — QueryClient Setup

```jsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PostsComponent from './components/PostsComponent';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // 5 minutes
      cacheTime: 1000 * 60 * 10,  // 10 minutes
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostsComponent />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}
```

### What each option does

**`staleTime: 300,000ms` (5 minutes)**
After a successful fetch, React Query marks the data as "fresh" for 5 minutes. During this window, any component that mounts and calls `useQuery('posts', ...)` will receive the cached data immediately — no network request is made. This is how caching reduces API calls.

**`cacheTime: 600,000ms` (10 minutes)**
When the component that owns a query unmounts (e.g. you navigate away), React Query keeps the cached data in memory for 10 minutes before garbage-collecting it. If the user navigates back within that window, the cached data is displayed immediately while a background refetch runs.

**`refetchOnWindowFocus: false`**
By default React Query refetches every query when the browser tab regains focus. This is disabled here so caching behaviour is easier to observe during development — re-enabling it in production is recommended.

**`retry: 2`**
If a fetch fails, React Query automatically retries it up to 2 times with exponential backoff before moving to the error state.

**`QueryClientProvider`**
Wraps the entire component tree and makes the `queryClient` instance available to every `useQuery` call inside it via React Context — similar to how Redux's `Provider` works.

---

## PostsComponent.jsx — Deep Dive

`PostsComponent` is the heart of the application. It is responsible for fetching, caching, filtering, paginating, and rendering 100 posts from the JSONPlaceholder API. Here is a section-by-section walkthrough of the implementation.

---

### The API Fetcher Function

```jsx
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error(`Network error: ${response.status} ${response.statusText}`);
  }
  return response.json();
};
```

This is a plain `async` function — it has no React-specific imports and no awareness of React Query. This is intentional. React Query treats the fetcher as a black box: it calls it, waits for the promise to resolve, and stores whatever it returns in the cache under the provided query key.

**Why throw on `!response.ok`?**
The native `fetch` API does not throw on HTTP error codes (4xx, 5xx) — it only throws on network failures. By manually checking `response.ok` and throwing, we ensure React Query's error state is triggered correctly for any non-2xx response, not just connection failures.

---

### useQuery Hook

```jsx
const {
  data: posts,
  isLoading,
  isError,
  error,
  isFetching,
  dataUpdatedAt,
  refetch,
} = useQuery('posts', fetchPosts);
```

`useQuery` is called with two required arguments:

**Query key: `'posts'`**
This string is the unique identifier for this query in the cache. React Query uses it as the cache key — any other component anywhere in the app that calls `useQuery('posts', ...)` will read from and write to the same cache entry. Keys can also be arrays for parameterised queries, e.g. `['post', id]`.

**Fetcher function: `fetchPosts`**
The async function defined above. React Query calls this automatically when the component mounts (if the data is stale or absent) and whenever a refetch is triggered.

#### Destructured return values

| Value | Type | Description |
|---|---|---|
| `data` (aliased `posts`) | `Post[] \| undefined` | The fetched array of posts. `undefined` during the initial load. |
| `isLoading` | `boolean` | `true` only on the very first fetch — when there is no cached data at all yet. |
| `isError` | `boolean` | `true` if the fetcher threw an error and all retries were exhausted. |
| `error` | `Error \| null` | The error object thrown by `fetchPosts`, available when `isError` is true. |
| `isFetching` | `boolean` | `true` whenever a fetch is in-flight — including background refetches. Unlike `isLoading`, this is `true` even when cached data is already displayed. |
| `dataUpdatedAt` | `number` | Unix timestamp (ms) of the last successful fetch. Used to display "Last updated" in the UI. |
| `refetch` | `function` | Imperatively triggers a new fetch, bypassing the stale time check. Called when the user clicks the Refetch button. |

---

### Query States Explained

React Query cycles through several states during a query's lifetime. `PostsComponent` handles each one explicitly:

**Loading state** — `isLoading === true`

```jsx
if (isLoading) {
  return (
    <div className="state-container">
      <div className="spinner" />
      <p>Fetching posts from JSONPlaceholder…</p>
    </div>
  );
}
```

This branch only renders on the very first fetch when the cache is empty. On subsequent mounts (after the cache is warm), `isLoading` is `false` and the cached data renders immediately — even if a background refetch is in progress.

**Error state** — `isError === true`

```jsx
if (isError) {
  return (
    <div className="state-container error-state">
      <p className="error-icon">⚠️</p>
      <h2>Something went wrong</h2>
      <p className="error-message">{error.message}</p>
      <button onClick={() => refetch()}>Try Again</button>
    </div>
  );
}
```

Rendered after all retries (2, as configured) have failed. The "Try Again" button calls `refetch()` to kick off a fresh attempt. The `error.message` is the string passed to `new Error(...)` inside `fetchPosts`.

**Success state** — `data` is available

The main render branch. Because `isLoading` and `isError` are handled first, TypeScript (or any reader) can safely assume `posts` is a defined array by the time the success JSX runs.

---

### Caching Strategy

Caching is the most powerful feature React Query provides, and it requires zero additional code in `PostsComponent` — it is entirely handled by the `QueryClient` configuration in `App.jsx`.

**How it works step by step:**

1. Component mounts for the first time → cache is empty → `isLoading` is `true` → `fetchPosts` is called → data arrives → stored in cache under key `'posts'` → `isLoading` becomes `false`, `data` is populated.

2. Component unmounts (user navigates away) → React Query starts a 10-minute `cacheTime` countdown but keeps the data in memory.

3. Component mounts again within 10 minutes → cache has data → `isLoading` is `false` immediately → data renders instantly → React Query checks if data is older than `staleTime` (5 minutes).
   - If data is still fresh (< 5 min old): no network request is made at all.
   - If data is stale (> 5 min old): data renders from cache immediately AND a background refetch runs. When it completes, the UI updates seamlessly — no loading spinner.

4. After 10 minutes with no subscribers: the cache entry is garbage-collected and the next mount starts fresh.

This behaviour means users almost never see loading spinners after the first visit, while still receiving fresh data automatically.

---

### On-Demand Refetching

```jsx
<button
  className={`btn btn-refetch ${isFetching ? 'btn-loading' : ''}`}
  onClick={() => refetch()}
  disabled={isFetching}
>
  {isFetching ? '⟳ Fetching…' : '↺ Refetch Data'}
</button>
```

The `refetch()` function returned by `useQuery` triggers a new network request regardless of whether the data is stale or fresh. This is how users can manually force an update on demand.

**`isFetching` vs `isLoading` in the button:**
`isFetching` is used here (not `isLoading`) because after the first load, `isLoading` is permanently `false`. `isFetching` becomes `true` any time a request is in-flight — including background refetches and manual refetches — so it correctly reflects the button's loading state in all situations.

The button is disabled while `isFetching` is `true` to prevent duplicate simultaneous requests.

---

### Search Filtering

```jsx
const filteredPosts = posts
  ? posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];
```

Search is performed entirely on the **client side**, against the already-cached array. This is a key advantage of caching all 100 posts upfront — filtering, sorting, and searching never require additional API calls. React Query fetches once; the UI can slice and dice the data freely.

The `searchTerm` state is local to `PostsComponent` and drives a `<input>` that calls `setSearchTerm` on every keystroke. Changing the search term also resets `currentPage` to 1 to avoid landing on a page that no longer has results.

---

### Pagination

```jsx
const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
const paginatedPosts = filteredPosts.slice(
  (currentPage - 1) * postsPerPage,
  currentPage * postsPerPage
);
```

Pagination is purely client-side — `Array.slice` is used to take a window of 9 posts at a time from the filtered array. `currentPage` is local `useState`. Because the full dataset is already in the React Query cache, navigating between pages is instantaneous.

---

### The Cache Info Banner

```jsx
<div className="cache-banner">
  <span>📦 <strong>{posts.length}</strong> posts cached</span>
  <span>🕒 Last updated: <strong>{formattedTime}</strong></span>
  <span>🔎 Showing <strong>{filteredPosts.length}</strong> results</span>
  {isFetching && <span className="fetching-badge">Refreshing…</span>}
</div>
```

This banner makes the React Query cache visible in the UI for learning purposes:

- **Posts cached** — confirms the full dataset (100) is in memory, not just the current page.
- **Last updated** — derived from `dataUpdatedAt` (the Unix timestamp returned by `useQuery`), formatted with `toLocaleTimeString()`. Updates every time a refetch succeeds.
- **Results showing** — the count of posts matching the current search filter.
- **"Refreshing…" badge** — appears when `isFetching` is `true`, making background refetches visible. This badge shows even while cached data is displayed — demonstrating that React Query can update silently without disrupting the user.

---

## React Query DevTools

```jsx
import { ReactQueryDevtools } from 'react-query/devtools';

<ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
```

The DevTools panel (floating button in the bottom-right corner during development) provides a live view into the React Query cache. You can:

- See all active query keys and their current status (`fresh`, `fetching`, `stale`, `inactive`, `paused`)
- Inspect the exact data stored in cache for each query
- Manually trigger refetches or invalidations from the panel
- Watch the `dataUpdatedAt` timestamp update in real time
- Observe `staleTime` and `cacheTime` countdowns

The DevTools are automatically excluded from production builds.

---

## Data Flow Diagram

```
User visits the app
        │
        ▼
PostsComponent mounts
        │
        ▼
useQuery('posts', fetchPosts) called
        │
        ├─── Cache empty? ──────────────► isLoading = true
        │                                  fetchPosts() called
        │                                  ↓
        │                               API responds
        │                                  ↓
        │                               data stored in cache
        │                                  ↓
        │                               isLoading = false, data available
        │
        └─── Cache warm (< staleTime)? ► data returned immediately
                                          isFetching = false
                                          No network request

        └─── Cache stale (> staleTime)? ► data returned immediately (from cache)
                                          isFetching = true (background refetch)
                                          fetchPosts() called in background
                                          New data arrives → UI updates silently
                                          isFetching = false
```

---

## Key React Query Concepts Demonstrated

| Concept | Where in the code | What it shows |
|---|---|---|
| QueryClient configuration | `App.jsx` | `staleTime`, `cacheTime`, `retry`, `refetchOnWindowFocus` |
| QueryClientProvider | `App.jsx` | Making the cache available to the component tree |
| `useQuery` hook | `PostsComponent.jsx` | Core data-fetching with automatic caching |
| `isLoading` vs `isFetching` | Loading spinner + Refetch button | First-load vs background-refresh distinction |
| Error handling | Error state JSX | Catching thrown errors, displaying messages, retry button |
| `refetch()` | Refetch button | Imperatively bypassing the cache |
| `dataUpdatedAt` | Cache banner | Knowing when data was last fetched |
| Stale-while-revalidate | Navigation + return | Instant display from cache + silent background update |
| Client-side derived state | Search + pagination | Operating on cached data without extra API calls |
| DevTools | Bottom-right panel | Inspecting cache state visually |

---

## Testing the Cache Manually

To observe React Query's caching behaviour in your browser:

1. **Open DevTools → Network tab** and load the app. You should see one request to `jsonplaceholder.typicode.com/posts`.

2. **Search for a term** — watch the Network tab. No new request fires because filtering is done on the already-cached data.

3. **Paginate** — same result. No network requests. All 100 posts are in memory.

4. **Click "↺ Refetch Data"** — a new network request fires. The "Last updated" timestamp in the banner updates.

5. **Open React Query DevTools** (bottom-right button) and find the `posts` query. Watch its status change from `fresh` → `stale` as the `staleTime` timer elapses.

6. **Navigate away and back** (if you add additional routes) — on return, data renders instantly from cache. If it has gone stale, you will briefly see the "Refreshing…" badge while the background refetch runs.