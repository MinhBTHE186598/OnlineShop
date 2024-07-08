import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../utility/register.css';
import logo from '../../utility/testlogo.png';

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
  const [isShipper, setIsShipper] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register"
  }, [])
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

      const endpoint = isShipper ? 'registerShipper' : 'registerUser';

      const response = await axios.post(`http://localhost:5000/user/${endpoint}`, {
        name,
        gmail,
        number,
        password,
        address,
        firstName,
        lastName
      });

      if (response.data.success) {
        alert('Đăng kí thành công');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error: ' + error.message);
    }
  };

  return (
    <div className='wrapper'>
      <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110vh' }}>
        <Row style={{ width: '100%', maxWidth: '1500px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <Col md={6} style={{ backgroundColor: '#343a40', color: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image src={logo} roundedCircle style={{ width: '100%', maxWidth: '100%' }} />
          </Col>
          <Col md={6} style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Form style={{ width: '100%', textAlign: 'center' }} onSubmit={handleSubmit}>
              <h2>{isShipper ? 'Đăng kí tài khoản Shipper' : 'Đăng kí tài khoản Người dùng'}</h2>
              <Form.Group className="mb-3" controlId="formGroupNameShop">
                <div className='input-box'>
                  <Form.Control type="text" id="user_name" placeholder="Tài khoản" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control type="text" id="address" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <Row>
                  <Col>
                    <div className='input-box'>
                      <Form.Control id="first_name" type="text" placeholder="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                  </Col>
                  <Col>
                    <div className='input-box'>
                      <Form.Control id="last_name" type="text" placeholder="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </Col>
                </Row>
                <div className='input-box'>
                  <Form.Control id="email" type="email" placeholder="Gmail" value={gmail} onChange={(e) => setGmail(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control id="number" type="text" placeholder="Số điện thoại" value={number} onChange={(e) => setNumber(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control id="password" type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className='input-box'>
                  <Form.Control id="cf_password" type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red', marginTop: '5px' }}>{error}</p>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  id="shipperCheckbox"
                  label="Ấn vào nếu bạn muốn đăng kí shipper"
                  checked={isShipper}
                  onChange={(e) => setIsShipper(e.target.checked)}
                />
              </Form.Group>

              <div className='input-box button'>
                <Button id="submit_bt" variant="dark" type="submit" style={{ zoom :'1.5' }}>
                  Đăng kí
                </Button>
              </div>
              <p style={{ marginTop: '10px', fontSize: 'small' }}>
                By clicking submit, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default RegisterBoard;
