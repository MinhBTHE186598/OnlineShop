import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function FormGroupExample() {
  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form style={{ width: '300px', textAlign: 'center' }}>
        <h2>Đăng kí bán hàng</h2>
        <p>Làm chủ cuộc chơi của bạn</p>
        <Form.Group className="mb-3" controlId="formGroupNameShop">
          <Form.Control type="text" placeholder="Tên shop" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAddress">
          <Form.Control type="text" placeholder="Địa chỉ" />
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

export default FormGroupExample;
