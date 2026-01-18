import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#34495e',
      color: 'white',
      textAlign: 'center',
      padding: '2rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ margin: '0 0 1rem 0' }}>
          &copy; 2024 Our Company. All rights reserved.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#2c3e50', borderRadius: '4px' }}>
            Privacy Policy
          </span>
          <span style={{ padding: '0.5rem 1rem', backgroundColor: '#2c3e50', borderRadius: '4px' }}>
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;