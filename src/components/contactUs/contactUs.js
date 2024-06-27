import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../../utility/contact.css';

const ContactForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user, isLogin } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      alert('Please login first!');
      navigate('/login');
    }
  }, [isLogin, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const UserID = user.UserID;
    
    try {
      const response = await axios.post('http://localhost:5000/contact/addContact', {
        title, 
        content,
        UserID
      });
      console.log(response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <Container fluid className="form-container" style={{backgroundColor: '#0d6efd'}}>
      <Row className="form-wrapper">
        <Form onSubmit={handleSubmit}>
          <div>
            <h2 style={{textAlign: 'center'}}>Liên hệ</h2>
            <label>Tiêu đề</label>
            <input 
              type="text" 
              placeholder='Tiêu đề'
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
            />
          </div>
          <div>
            <label>Nội dung</label>
            <textarea
              id='content'
              value={content} 
              placeholder='Bạn hãy miêu tả vấn đề gặp phải'
              onChange={(e) => setContent(e.target.value)} 
            />
          </div>
          <Button type="submit">Gửi</Button>
        </Form>
      </Row>
    </Container>
  );
};

export default ContactForm;
