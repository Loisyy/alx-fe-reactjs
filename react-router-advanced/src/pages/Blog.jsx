import { Link } from 'react-router-dom';

// Sample blog post data to demonstrate dynamic routing
export const POSTS = [
  {
    id: 1,
    title: 'Getting Started with React Router',
    excerpt: 'Learn how to set up React Router in a brand new Vite project and wire up your first routes.',
    author: 'Alice Johnson',
    date: 'Feb 10, 2025',
    tag: 'React',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Understanding Nested Routes',
    excerpt: 'Deep-dive into how nested routes and the Outlet component work together to build complex layouts.',
    author: 'Bob Smith',
    date: 'Feb 14, 2025',
    tag: 'Routing',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Dynamic Routing with URL Parameters',
    excerpt: 'Use useParams to read dynamic segments from the URL and render data-driven pages.',
    author: 'Carol White',
    date: 'Feb 18, 2025',
    tag: 'Advanced',
    readTime: '6 min read',
  },
  {
    id: 4,
    title: 'Protecting Routes with Authentication',
    excerpt: 'Build a ProtectedRoute component to redirect unauthenticated users to a login page.',
    author: 'David Lee',
    date: 'Feb 20, 2025',
    tag: 'Security',
    readTime: '8 min read',
  },
  {
    id: 5,
    title: 'Programmatic Navigation with useNavigate',
    excerpt: 'Trigger route changes from within event handlers using the useNavigate hook.',
    author: 'Eve Martinez',
    date: 'Feb 22, 2025',
    tag: 'Hooks',
    readTime: '4 min read',
  },
  {
    id: 6,
    title: 'The Power of NavLink vs Link',
    excerpt: 'Discover when to use NavLink over Link and how to apply active styles to your navigation.',
    author: 'Frank Brown',
    date: 'Feb 25, 2025',
    tag: 'UI',
    readTime: '3 min read',
  },
];

const TAG_COLORS = {
  React: '#3b82f6',
  Routing: '#8b5cf6',
  Advanced: '#f59e0b',
  Security: '#ef4444',
  Hooks: '#10b981',
  UI: '#06b6d4',
};

const Blog = () => (
  <div className="page">
    <div className="page-header">
      <h1>📝 Blog</h1>
      <p>Click any post to see dynamic routing with <code>/blog/:id</code> in action.</p>
    </div>

    <div className="posts-grid">
      {POSTS.map((post) => (
        <Link to={`/blog/${post.id}`} key={post.id} className="post-card">
          <div className="post-tag" style={{ backgroundColor: TAG_COLORS[post.tag] }}>
            {post.tag}
          </div>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-excerpt">{post.excerpt}</p>
          <div className="post-meta">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default Blog;