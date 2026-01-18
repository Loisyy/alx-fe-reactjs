import React from 'react';

function Services() {
  const services = [
    {
      title: "Technology Consulting",
      description: "Expert advice on technology strategy, implementation, and optimization.",
      icon: "💻"
    },
    {
      title: "Market Analysis",
      description: "Comprehensive market research and analysis to drive your fashion-tech business decisions.",
      icon: "📊"
    },
    {
      title: "Product Development",
      description: "End-to-end product development from concept to launch and beyond.",
      icon: "🚀"
    },
    {
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns to boost your online presence.",
      icon: "🎯"
    },
    {
      title: "Immersive Fashion Experiences",
      description: "Augmented and virtual reality experiences to showcase your fashion products.",
      icon: "🕶️"
    },
    {
      title: "Data Analytics",
      description: "Transform your data into actionable insights and business intelligence.",
      icon: "📈"
    }
  ];

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          color: '#B76E79', // soft pink
          fontSize: '2.5rem',
          marginBottom: '1rem'
        }}>
          Our Services
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#555555',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          We offer a comprehensive suite of services designed to help your fashion-tech business thrive with innovation, creativity, and immersive experiences.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        {services.map((service, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              padding: '2rem',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.08)',
              textAlign: 'center',
              transition: 'transform 0.3s, box-shadow 0.3s',
              border: '1px solid #f5d3da' // soft pink border
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.08)';
            }}
          >
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              {service.icon}
            </div>

            <h3 style={{
              color: '#7d2953', // darker pink for headings
              marginBottom: '1rem',
              fontSize: '1.5rem'
            }}>
              {service.title}
            </h3>

            <p style={{
              color: '#555555',
              lineHeight: '1.6'
            }}>
              {service.description}
            </p>

            <button
              style={{
                backgroundColor: 'transparent',
                color: '#B76E79', // soft pink button
                border: '2px solid #B76E79',
                padding: '0.5rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '1rem',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#B76E79';
                e.target.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#B76E79';
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
