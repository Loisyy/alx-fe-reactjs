import React, { useContext } from 'react';
import UserContext from './UserContext';

function UserProfile() {
  // Use useContext hook to consume the UserContext
  const userData = useContext(UserContext);

  return (
    <div style={{ 
      border: '2px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      margin: '15px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        color: '#2c3e50',
        fontSize: '1.8rem',
        marginBottom: '15px',
        borderBottom: '2px solid #3498db',
        paddingBottom: '8px'
      }}>
        User Profile
      </h2>
      <div style={{ marginTop: '15px' }}>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3498db' }}>Name:</strong> {userData.name}
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3498db' }}>Email:</strong> {userData.email}
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3498db' }}>Age:</strong> {userData.age}
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3498db' }}>Location:</strong> {userData.location}
        </p>
        <p style={{ 
          fontSize: '1.1rem', 
          margin: '10px 0',
          padding: '8px',
          backgroundColor: 'white',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#3498db' }}>Member Since:</strong> {userData.joinDate}
        </p>
      </div>
    </div>
  );
}

export default UserProfile;