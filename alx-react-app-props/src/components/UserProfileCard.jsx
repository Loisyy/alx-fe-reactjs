import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

function UserProfileCard() {
  const userData = useContext(UserContext);

  return (
    <div style={{
      border: '2px solid #3498db',
      borderRadius: '10px',
      padding: '20px',
      margin: '20px 0',
      backgroundColor: 'white',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Profile Card</h3>
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#3498db',
        borderRadius: '50%',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold'
      }}>
        {userData.name.charAt(0)}
      </div>
      <h4 style={{ color: '#2c3e50', margin: '10px 0' }}>{userData.name}</h4>
      <p style={{ color: '#7f8c8d', margin: '5px 0' }}>{userData.email}</p>
      <p style={{ color: '#7f8c8d', margin: '5px 0' }}>{userData.location}</p>
    </div>
  );
}

export default UserProfileCard;