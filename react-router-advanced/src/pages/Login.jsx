import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // After login, send the user back to wherever they tried to go
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Please enter both a username and password.');
      return;
    }
    // Simulated auth — any non-empty credentials pass
    login(username.trim());
    navigate(from, { replace: true });
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h2>🔐 Login</h2>

        {location.state?.from && (
          <div className="redirect-notice">
            You must be logged in to visit <code>{location.state.from.pathname}</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Any username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Any password"
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn btn-primary btn-full">
            Login
          </button>
        </form>

        <p className="auth-note">
          💡 This is a simulated login — any non-empty credentials will work.
        </p>
        <p className="auth-note">
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;