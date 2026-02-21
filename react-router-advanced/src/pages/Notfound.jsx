import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page">
    <div className="not-found">
      <div className="not-found-code">404</div>
      <h2>Page Not Found</h2>
      <p>The route you're looking for doesn't exist in this application.</p>
      <Link to="/" className="btn btn-primary">← Back to Home</Link>
    </div>
  </div>
);

export default NotFound;