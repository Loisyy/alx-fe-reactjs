import React from 'react';
import UserInfo from './UserInfo';

function ProfilePage() {
  return (
    <div style={{ 
      border: '2px solid #bdc3c7', 
      borderRadius: '10px', 
      padding: '20px', 
      margin: '20px 0',
      backgroundColor: '#ecf0f1'
    }}>
      <h2 style={{ color: '#34495e', textAlign: 'center' }}>Profile Page</h2>
      <UserInfo />
    </div>
  );
}

export default ProfilePage;