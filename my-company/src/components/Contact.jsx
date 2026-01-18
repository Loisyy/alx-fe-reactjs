import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* Contact Form */}
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
            Contact LoisnyksDesign
          </h1>

          <form onSubmit={handleSubmit}>
            {['name', 'email'].map((field) => (
              <div key={field} style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  color: '#7f5a6a', // soft warm text
                  fontWeight: 'bold'
                }}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  name={field}
                  placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '2px solid #f5e6e8', // soft pink border
                    borderRadius: '5px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#B76E79'}
                  onBlur={(e) => e.target.style.borderColor = '#f5e6e8'}
                />
              </div>
            ))}

            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#7f5a6a',
                fontWeight: 'bold'
              }}>
                Message
              </label>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #f5e6e8',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#B76E79'}
                onBlur={(e) => e.target.style.borderColor = '#f5e6e8'}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#B76E79', // soft pink button
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#9d5a6a'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#B76E79'}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: '#f9e6ec', // soft pink background
          color: '#7f5a6a', // soft warm text
          padding: '3rem',
          borderRadius: '10px'
        }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2rem', color: '#B76E79' }}>
            Get In Touch
          </h2>

          {[
            ['Address', '123 Fashion Street\nSuite 100\nNew York, NY 10001'],
            ['Phone', '+1 (555) 123-4567'],
            ['Email', 'contact@loisnyksdesign.com'],
            ['Business Hours', 'Mon–Fri: 9AM–6PM\nSat: 10AM–4PM\nSun: Closed']
          ].map(([title, text]) => (
            <div key={title} style={{ marginBottom: '2rem' }}>
              <h3 style={{ color: '#B76E79', marginBottom: '1rem' }}>{title}</h3>
              <p style={{ whiteSpace: 'pre-line' }}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Contact;
