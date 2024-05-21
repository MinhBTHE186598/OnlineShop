import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function RegisterBoard() {
  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form style={{ width: '300px', textAlign: 'center' }}>
        <h2>Đăng kí tài khoản</h2>
        
        <Form.Group className="mb-3" controlId="formGroupNameShop">
          <Form.Control type="text" placeholder="Tài khoản" />
          <Form.Control type="gmail" placeholder="Gmail" />
          <Form.Control type="text" placeholder="Số điện thoại" />
          <Form.Control type="password" placeholder="Mật khẩu" />
          <Form.Control type="password" placeholder="Xác nhận mật khẩu" />

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
