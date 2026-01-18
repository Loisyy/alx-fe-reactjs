import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{
      backgroundColor: '#b83280', // deep fashion pink
      padding: '1rem 2rem',
      boxShadow: '0 4px 12px rgba(184, 50, 128, 0.35)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Brand */}
        <div style={{
          color: '#fff0f6', // soft blush white
          fontSize: '1.6rem',
          fontWeight: '700',
          letterSpacing: '0.6px'
        }}>
          LoisnyksDesign
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          gap: '2rem'
        }}>
          {['/', '/about', '/services', '/contact'].map((path, index) => {
            const labels = ['Home', 'About', 'Services', 'Contact'];
            return (
              <Link
                key={index}
                to={path}
                style={{
                  color: '#fff0f6',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#9d174d'; // darker pink hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                {labels[index]}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
