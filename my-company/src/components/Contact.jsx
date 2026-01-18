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
            Contact Us
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2c3e50',
                fontWeight: 'bold'
              }}>
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #ecf0f1',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2c3e50',
                fontWeight: 'bold'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem',
                  border: '2px solid #ecf0f1',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                color: '#2c3e50',
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
                  border: '2px solid #ecf0f1',
                  borderRadius: '5px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'border-color 0.3s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
            </div>
            
            <button 
              type="submit"
              style={{
                width: '100%',
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
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div style={{
          backgroundColor: '#2c3e50',
          color: 'white',
          padding: '3rem',
          borderRadius: '10px'
        }}>
          <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>
            Get In Touch
          </h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>Address</h3>
            <p>123 Business Street<br />Suite 100<br />New York, NY 10001</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>Email</h3>
            <p>info@ourcompany.com</p>
          </div>
          
          <div>
            <h3 style={{ color: '#3498db', marginBottom: '1rem' }}>Business Hours</h3>
            <p>Monday - Friday: 9:00 AM - 6:00 PM<br />Saturday: 10:00 AM - 4:00 PM<br />Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;