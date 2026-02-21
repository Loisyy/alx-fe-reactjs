import { useAuth } from '../context/AuthContext';

const ProfileDetails = () => {
  const { currentUser } = useAuth();

  return (
    <div className="nested-page">
      <h2>👤 Profile Details</h2>
      <p className="nested-subtitle">Your personal account information</p>

      <div className="detail-card">
        <div className="detail-row">
          <span className="detail-label">Username</span>
          <span className="detail-value">{currentUser.username}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">User ID</span>
          <span className="detail-value">{currentUser.id}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Account Status</span>
          <span className="detail-value badge badge-green">Active</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Role</span>
          <span className="detail-value badge badge-blue">Member</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Email</span>
          <span className="detail-value">{currentUser.username.toLowerCase()}@example.com</span>
        </div>
      </div>

      <div className="route-info">
        <code>Route: /profile (index)</code>
        <p>This is a nested index route — it renders inside the Profile layout via its <code>&lt;Outlet /&gt;</code>.</p>
      </div>
    </div>
  );
};

export default ProfileDetails;