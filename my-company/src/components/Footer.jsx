import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#B76E79', // soft pink
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
          &copy; 2026 LoisnyksDesign. All rights reserved.
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem'
        }}>
          <span style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#9d5a6a', // slightly darker pink for buttons
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#833d55'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#9d5a6a'}
          >
            Privacy Policy
          </span>
          <span style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: '#9d5a6a', 
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#833d55'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#9d5a6a'}
          >
            Terms of Service
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
