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
        backgroundColor: '#ffffff',
        padding: '3rem',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
      }}>
        <h1 style={{
          color: '#B76E79', // soft pink headline
          fontSize: '2.5rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          About LoisnyksDesign
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
              color: '#7f5a6a', // soft warm text
              marginBottom: '1.5rem'
            }}>
              LoisnyksDesign has been delivering cutting-edge fashion technology experiences since 1990.
              We specialize in immersive fashion tech, digital runway experiences, and innovative fashion services.
            </p>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#7f5a6a',
              marginBottom: '1.5rem'
            }}>
              With over 30 years of experience, we've helped fashion brands explore digital transformation,
              immersive technologies, and next-generation fashion solutions.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f9e6ec', // soft pink background
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#B76E79', marginBottom: '1rem' }}>
              Our Mission
            </h3>
            <p style={{ color: '#7f5a6a', lineHeight: '1.6' }}>
              To empower fashion brands with immersive tech solutions that drive creativity, engagement,
              and sustainable growth in an ever-evolving fashion landscape.
            </p>
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#f8f1f3', // soft blush background
          borderRadius: '8px'
        }}>
          <h3 style={{
            color: '#B76E79',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Company Timeline
          </h3>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            textAlign: 'center'
          }}>
            {[1990, 2005, 2024].map((year, index) => (
              <div key={index}>
                <div style={{
                  backgroundColor: '#B76E79', // soft pink circle
                  color: '#ffffff',
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
                  {year}
                </div>
                <p style={{ color: '#7f5a6a' }}>
                  {index === 0 ? 'Founded' : index === 1 ? 'Global Expansion' : 'Today'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
