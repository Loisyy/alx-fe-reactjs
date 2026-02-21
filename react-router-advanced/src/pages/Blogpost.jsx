import { useParams, Link, useNavigate } from 'react-router-dom';
import { POSTS } from './Blog';

const TAG_COLORS = {
  React: '#3b82f6',
  Routing: '#8b5cf6',
  Advanced: '#f59e0b',
  Security: '#ef4444',
  Hooks: '#10b981',
  UI: '#06b6d4',
};

// Extended body paragraphs per post
const BODIES = {
  1: `React Router is the de facto standard for routing in React applications. Getting it set up is straightforward: install react-router-dom, wrap your app in a BrowserRouter, and define your routes using the Routes and Route components. Once in place, you can navigate between pages without any full-page refresh, creating a fast and fluid user experience. This article walks through creating your first routes from scratch in a fresh Vite project, covering the difference between element-based routing in v6 versus the older component prop approach in v5.`,
  2: `Nested routes allow child components to render inside a parent layout without the parent unmounting. The key ingredient is the Outlet component — placed inside the parent, it acts as a placeholder that React Router fills with the matched child route's component. This pattern is perfect for dashboards, admin panels, or any page that shares a consistent sidebar or header while swapping out a main content area. This post explains how to set up multi-level nesting and how to use index routes to render a default child.`,
  3: `Dynamic routing lets a single route definition handle an infinite number of URLs. By adding a colon-prefixed segment like :id to your path, React Router captures whatever value appears there and makes it available through the useParams hook. This is how most content-driven applications work — one BlogPost component handles /blog/1, /blog/42, and /blog/99 equally, fetching or looking up data based on the extracted id. This guide covers reading params, handling missing records gracefully, and even nested dynamic routes.`,
  4: `Authentication-gated routes are a fundamental pattern in real-world apps. The approach is simple: create a ProtectedRoute wrapper component that reads the current auth state, and if the user isn't logged in, redirect them to /login using the Navigate component — while preserving the original destination in location state so you can send them there after a successful login. This post also covers how to expose auth state globally using the Context API so any component in the tree can check whether a user is authenticated.`,
  5: `Sometimes you need to navigate programmatically — after a form submission, after a timer fires, or after an async operation completes. useNavigate returns a navigate function that you can call from anywhere inside a component. Pass a path string to push a new entry onto the history stack, or pass -1 to go back. You can also pass a replace option to swap the current entry rather than push, which is useful after login to avoid the user hitting "back" and returning to the login page.`,
  6: `Both Link and NavLink render an anchor tag under the hood, but NavLink adds an extra superpower: it automatically applies an active class (or any class/style you define) when its href matches the current URL. This makes it ideal for navigation menus where you want to highlight the current page. You can pass a function to the className or style prop to get an isActive boolean and compute whatever you need. The end prop prevents parent routes from staying active when a child route is visited.`,
};

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = POSTS.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="page">
        <div className="not-found">
          <h2>404 — Post Not Found</h2>
          <p>No blog post exists at <code>/blog/{id}</code>.</p>
          <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  const currentIndex = POSTS.findIndex((p) => p.id === post.id);
  const prevPost = POSTS[currentIndex - 1];
  const nextPost = POSTS[currentIndex + 1];

  return (
    <div className="page">
      <button className="btn btn-ghost" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      <article className="blog-article">
        <div className="article-tag" style={{ backgroundColor: TAG_COLORS[post.tag] }}>
          {post.tag}
        </div>
        <h1 className="article-title">{post.title}</h1>
        <div className="article-meta">
          <span>✍️ {post.author}</span>
          <span>📅 {post.date}</span>
          <span>⏱️ {post.readTime}</span>
        </div>

        <div className="route-info">
          <code>Route: /blog/<strong>{id}</strong> — id extracted via useParams()</code>
        </div>

        <p className="article-excerpt">{post.excerpt}</p>
        <p className="article-body">{BODIES[post.id]}</p>
      </article>

      {/* Post navigation */}
      <div className="post-navigation">
        {prevPost ? (
          <Link to={`/blog/${prevPost.id}`} className="post-nav-link prev">
            ← {prevPost.title}
          </Link>
        ) : <span />}
        {nextPost ? (
          <Link to={`/blog/${nextPost.id}`} className="post-nav-link next">
            {nextPost.title} →
          </Link>
        ) : <span />}
      </div>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <Link to="/blog" className="btn btn-secondary">← All Posts</Link>
      </div>
    </div>
  );
};

export default BlogPost;