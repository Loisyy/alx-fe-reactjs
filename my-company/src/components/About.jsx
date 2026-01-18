import React from 'react';

function About() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          About Us
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <div>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#34495e',
              marginBottom: '1.5rem'
            }}>
              Our company has been providing top-notch services since 1990. 
              We specialize in various fields including technology, marketing, and consultancy.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#34495e',
              marginBottom: '1.5rem'
            }}>
              With over 30 years of experience, we've helped thousands of businesses 
              achieve their goals and reach new heights of success.
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#ecf0f1',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Our Mission</h3>
            <p style={{ color: '#7f8c8d', lineHeight: '1.6' }}>
              To empower businesses with innovative solutions that drive growth, 
              efficiency, and sustainable success in an ever-evolving market landscape.
            </p>
          </div>
        </div>
        
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#2c3e50', textAlign: 'center', marginBottom: '2rem' }}>
            Company Timeline
          </h3>
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center'
          }}>
            <div>
              <div style={{
                backgroundColor: '#3498db',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                1990
              </div>
              <p style={{ color: '#7f8c8d' }}>Founded</p>
            </div>
            <div>
              <div style={{
                backgroundColor: '#3498db',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                2005
              </div>
              <p style={{ color: '#7f8c8d' }}>Global Expansion</p>
            </div>
            <div>
              <div style={{
                backgroundColor: '#3498db',
                color: 'white',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem auto',
                fontSize: '1.2rem',
                fontWeight: 'bold'
              }}>
                2024
              </div>
              <p style={{ color: '#7f8c8d' }}>Today</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;