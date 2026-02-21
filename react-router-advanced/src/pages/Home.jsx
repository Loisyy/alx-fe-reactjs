import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Advanced React Router Demo</h1>
        <p>Explore nested routes, dynamic routing, and protected routes — all in one app.</p>
        <div className="hero-actions">
          <Link to="/blog" className="btn btn-primary">Read the Blog →</Link>
          {currentUser ? (
            <Link to="/profile" className="btn btn-secondary">My Profile</Link>
          ) : (
            <Link to="/login" className="btn btn-secondary">Login to Access Profile</Link>
          )}
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <span className="feature-icon">🗂️</span>
          <h3>Nested Routes</h3>
          <p>Profile has sub-routes for Details and Settings, demonstrating nested route layouts.</p>
          <Link to="/profile">View Profile →</Link>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔗</span>
          <h3>Dynamic Routing</h3>
          <p>Blog posts use <code>/blog/:id</code> to render variable content from a URL parameter.</p>
          <Link to="/blog">See Blog →</Link>
        </div>
        <div className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>Protected Routes</h3>
          <p>The Profile page requires authentication. Try visiting it without logging in!</p>
          <Link to="/profile">Try Protected Route →</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;