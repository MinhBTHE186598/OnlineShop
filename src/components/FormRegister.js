import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { useState } from 'react';

function RegisterBoard() {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('')
  const [number, setNumber] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/user/register', {
            name,
            gmail,
            number,
            password,
        });
        if (response.status === 201) {
            console.log('User added successfully');
            // // Optionally clear the form or update the UI
            // setName('');
            // setGmail('');
            // setNumber('');
            // setPassword('');
        } else {
            console.error('Failed to add user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ width: '300px', textAlign: 'center' }}>
        <h2>Đăng kí tài khoản</h2>
        
        <Form.Group className="mb-3" controlId="formGroupNameShop">
          <Form.Control type="text" placeholder="Tài khoản" onChange={(e)=> setName(e.target.value)} />
          <Form.Control type="gmail" placeholder="Gmail"  onChange={(e)=> setGmail(e.target.value)} />
          <Form.Control type="text" placeholder="Số điện thoại"  onChange={(e)=> setNumber(e.target.value)} />
          <Form.Control type="password" placeholder="Mật khẩu"  onChange={(e)=> setPassword(e.target.value)} />
          <Form.Control type="password" placeholder="Xác nhận mật khẩu"   />
        </Form.Group>
        <Button variant="dark" type="submit" style={{ width: '100%' }}>
          Đăng kí
        </Button>
        <p style={{ marginTop: '10px', fontSize: 'small' }}>
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </Form>
    </Container>
  );
}

export default RegisterBoard;
