import { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    newsletter: true,
    twoFactor: false,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="nested-page">
      <h2>⚙️ Settings</h2>
      <p className="nested-subtitle">Manage your account preferences</p>

      <div className="settings-list">
        {[
          { key: 'notifications', label: 'Email Notifications', desc: 'Receive updates about your account activity' },
          { key: 'darkMode', label: 'Dark Mode', desc: 'Switch to a darker color scheme' },
          { key: 'newsletter', label: 'Newsletter', desc: 'Receive our weekly newsletter' },
          { key: 'twoFactor', label: 'Two-Factor Auth', desc: 'Add an extra layer of security to your account' },
        ].map(({ key, label, desc }) => (
          <div key={key} className="setting-item">
            <div className="setting-text">
              <span className="setting-label">{label}</span>
              <span className="setting-desc">{desc}</span>
            </div>
            <button
              className={`toggle ${settings[key] ? 'toggle-on' : ''}`}
              onClick={() => toggle(key)}
              aria-pressed={settings[key]}
              aria-label={label}
            >
              <span className="toggle-knob" />
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-primary" onClick={handleSave}>
        {saved ? '✅ Saved!' : 'Save Changes'}
      </button>

      <div className="route-info">
        <code>Route: /profile/settings</code>
        <p>This is a nested child route — it shares the Profile layout and renders into the <code>&lt;Outlet /&gt;</code>.</p>
      </div>
    </div>
  );
};

export default ProfileSettings;