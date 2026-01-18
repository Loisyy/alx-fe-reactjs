import React from 'react';

function Home() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#ecf0f1',
        borderRadius: '10px',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          Welcome to Our Company
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#7f8c8d',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 2rem auto'
        }}>
          We are dedicated to delivering excellence in all our services. 
          Our team of professionals is committed to helping your business grow.
        </p>
        <button style={{
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
        >
          Get Started
        </button>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Innovation</h3>
          <p style={{ color: '#7f8c8d' }}>
            We stay ahead of the curve with cutting-edge solutions and innovative approaches.
          </p>
        </div>
        <div style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Quality</h3>
          <p style={{ color: '#7f8c8d' }}>
            Excellence is our standard. We deliver nothing but the highest quality services.
          </p>
        </div>
        <div style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#2c3e50' }}>Support</h3>
          <p style={{ color: '#7f8c8d' }}>
            Our dedicated support team is here to help you 24/7 with any questions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;