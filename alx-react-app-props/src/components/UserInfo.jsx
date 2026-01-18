import React from 'react';
import UserDetails from './UserDetails';

function UserInfo() {
  return (
    <div style={{ 
      border: '1px solid #95a5a6', 
      borderRadius: '8px', 
      padding: '15px', 
      margin: '15px 0',
      backgroundColor: 'white'
    }}>
      <h3 style={{ color: '#2c3e50' }}>User Information Section</h3>
      <UserDetails />
    </div>
  );
}

export default UserInfo;