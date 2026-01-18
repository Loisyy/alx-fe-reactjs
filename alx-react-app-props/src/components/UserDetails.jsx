import React, { useContext } from 'react';
import UserContext from '../context/UserContext'; // Default import

function UserDetails() {
  // Consume the UserContext using useContext hook
  const userData = useContext(UserContext);

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '5px',
      borderLeft: '4px solid #3498db'
    }}>
      <h3 style={{ 
        color: '#2c3e50', 
        borderBottom: '2px solid #bdc3c7', 
        paddingBottom: '10px' 
      }}>
        User Details
      </h3>
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

export default UserDetails;