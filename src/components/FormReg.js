import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

function FormGroupExample() {
  return (
    <Container fluid="sm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Form style={{ width: '300px', textAlign: 'center' }}>
        <h2>Create SHOP</h2>
        <p>Enter your shop name</p>
        <Form.Group className="mb-3" controlId="formGroupNameShop">
          <Form.Control type="text" placeholder="Tên shop" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupAddress">
          <Form.Control type="text" placeholder="Địa chỉ lấy hàng" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Control type="email" placeholder="Email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGroupPhone">
          <Form.Control type="text" placeholder="Phone number" />
        </Form.Group>
        <Button variant="dark" type="submit" style={{ width: '100%' }}>
          Sign up
        </Button>
        <p style={{ marginTop: '10px', fontSize: 'small' }}>
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
      </Form>
    </Container>
  );
}

export default FormGroupExample;
