import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Row from 'react-bootstrap/Row';

const ContactForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { title, content };
    
    try {
      const response = await axios.post('http://localhost:5000/api/contact', data);
      console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Row style={{ width: '100%', maxWidth: '1500px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div>
        <label>Content</label>
        <textarea 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
      </div>
      <Button type="submit">Submit</Button>
    </Form>
    </Row>
  </Container>
  );
};

export default ContactForm;
