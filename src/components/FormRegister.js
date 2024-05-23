import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../utility/testlogo.png'

function RegisterBoard() {
  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100vh' }}>
      
      <img src={logo} style={{ width: '40%' }} alt="Logo" />
      
      <Form style={{ width: '300px', }}>
       

      <h2>Đăng kí tài khoản</h2>
        <Form.Group className="mb-3" controlId="formRegister">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control type="text" placeholder="name" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control type="phone" placeholder="0123456789" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control type="password" />
          </Form.Group>

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
