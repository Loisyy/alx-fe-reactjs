import { NavLink, Outlet, useNavigate, Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileDetails from './ProfileDetails';
import ProfileSettings from './ProfileSettings';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="page profile-page">
      <aside className="profile-sidebar">
        <div className="profile-avatar">
          {currentUser.username.charAt(0).toUpperCase()}
        </div>
        <h3>{currentUser.username}</h3>
        <p className="profile-meta">Member since today</p>

        <nav className="profile-nav">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) => isActive ? 'profile-link active' : 'profile-link'}
          >
            👤 Profile Details
          </NavLink>
          <NavLink
            to="/profile/settings"
            className={({ isActive }) => isActive ? 'profile-link active' : 'profile-link'}
          >
            ⚙️ Settings
          </NavLink>
        </nav>

        <button className="btn btn-logout btn-full" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="profile-content">
        {/* Nested Routes — renders ProfileDetails or ProfileSettings */}
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Profile;