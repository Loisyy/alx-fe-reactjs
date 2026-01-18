import React from 'react';

function Home() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        backgroundColor: '#fff0f6', // soft blush pink
        borderRadius: '12px',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          color: '#B76E79', // deep fashion pink
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>
          Welcome to LoisnyksDesign
        </h1>

        <p style={{
          fontSize: '1.2rem',
          color: '#6b214a',
          lineHeight: '1.7',
          maxWidth: '650px',
          margin: '0 auto 2rem auto'
        }}>
          We create immersive fashion-tech experiences that blend design,
          innovation, and digital technology — redefining how fashion is
          imagined and experienced.
        </p>

        <button
          style={{
            backgroundColor: '#b83280',
            color: '#ffffff',
            border: 'none',
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#9d174d'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#b83280'}
        >
          Explore Our Work
        </button>
      </div>

      {/* Value Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {[
          {
            title: 'Immersive Design',
            text: 'We design XR-driven fashion experiences that blur the line between physical and digital.'
          },
          {
            title: 'Fashion Technology',
            text: 'From virtual try-ons to digital garments, we merge fashion with cutting-edge tech.'
          },
          {
            title: 'Creative Innovation',
            text: 'We push creative boundaries using emerging technologies and human-centered design.'
          }
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: '2rem',
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              boxShadow: '0 4px 15px rgba(184, 50, 128, 0.15)',
              textAlign: 'center'
            }}
          >
            <h3 style={{ color: '#9d174d', marginBottom: '1rem' }}>
              {item.title}
            </h3>
            <p style={{ color: '#555555', lineHeight: '1.6' }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
