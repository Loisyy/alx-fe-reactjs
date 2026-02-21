import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand">
        ⚛️ React Router Advanced
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Home
        </NavLink>

        <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          Blog
        </NavLink>

        {currentUser ? (
          <>
            <NavLink to="/profile" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Profile
            </NavLink>
            <button className="btn btn-logout" onClick={handleLogout}>
              Logout ({currentUser.username})
            </button>
          </>
        ) : (
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
