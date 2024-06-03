import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import logo from '../../utility/testlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../utility/register.css';

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
            // Optionally clear the form or update the UI
            setName('');
            setGmail('');
            setNumber('');
            setPassword('');
        } else {
            console.error('Failed to add user');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

  return (
    <div className='wrapper'>
      <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Row style={{ width: '100%', maxWidth: '1500px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Col md={6} style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={logo} roundedCircle style={{ width: '100%', maxWidth: '100%' }} />
          </Col>
          <Col md={6} style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'center' }}>
              <h2>Đăng kí tài khoản</h2>
              <Form.Group className="mb-3" controlId="formGroupNameShop">
                <div className='input-box'><Form.Control type="text" placeholder="Tài khoản" onChange={(e) => setName(e.target.value)} /></div>
                <div className='input-box'><Form.Control type="gmail" placeholder="Gmail" onChange={(e) => setGmail(e.target.value)} /></div>
                <div className='input-box'><Form.Control type="text" placeholder="Số điện thoại" onChange={(e) => setNumber(e.target.value)} /></div>
                <div className='input-box'><Form.Control type="password" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} /></div>
                <div className='input-box'><Form.Control type="password" placeholder="Xác nhận mật khẩu" /></div>
              </Form.Group>
              <div className="policy">
                <input type="checkbox" />
                <h3>Tôi đồng ý với <a href="#">Điều khoản</a> & <a href="#">Chính sách</a></h3>
              </div>
              <div className='input-box button'>
                <Button variant="dark" type="submit" style={{ width: '100%' }}>
                  Đăng kí
                </Button>
              </div>
              <p style={{ marginTop: '10px', fontSize: 'small' }}>
                By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterBoard;
