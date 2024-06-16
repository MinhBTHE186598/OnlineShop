import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import logo from '../../utility/testlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../utility/register.css';
import { useNavigate } from "react-router-dom";

function RegisterBoard() {
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Mật khẩu không trùng khớp');
      return;
    }
    setError('');

    try {
      const checkUserResponse = await axios.get('http://localhost:5000/user/checkUsername', {
        params: { name }
      });

      if (checkUserResponse.data.exists) {
        setError('Tài khoản tồn tại');
        return;
      }

      await axios.post('http://localhost:5000/user/registerUser', {
        name,
        gmail,
        number,
        password,
        address,
        firstName,
        lastName
      });

      alert('Đăng kí thành công');
      navigate('/login');
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className='wrapper'>
      <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Row style={{ width: '100%', maxWidth: '1500px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Col md={6} style={{ backgroundColor: '#343a40', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={logo} roundedCircle style={{ width: '100%', maxWidth: '100%' }} />
          </Col>
          <Col md={6} style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Form style={{ width: '100%', textAlign: 'center' }} onSubmit={handleSubmit}>
              <h2>Đăng kí tài khoản</h2>
              <Form.Group className="mb-3" controlId="formGroupNameShop">
                <div className='input-box'>
                  <Form.Control type="text" placeholder="Tài khoản" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <Row>
                  <Col>
                    <div className='input-box'>
                      <Form.Control type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                  </Col>
                  <Col>
                    <div className='input-box'>
                      <Form.Control type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </Col>
                </Row>
                <div className='input-box'>
                  <Form.Control type="email" placeholder="Gmail" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control type="text" placeholder="Số điện thoại" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
              </Form.Group>

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
