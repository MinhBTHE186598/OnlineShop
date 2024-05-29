import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import logo from './testlogo.png'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';

function FormGroupExample() {
  return (
    <Container fluid style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
      <Row style={{ width: '80%', maxWidth: '1000px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Col md={6} style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image src={logo} roundedCircle style={{ width: '100%', marginBottom: '20px' }} />
        </Col>
        <Col md={6} style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Đăng kí bán hàng</h2>
          <p>Làm chủ cuộc chơi của bạn</p>
          <Form style={{ width: '100%' }}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Control type="text" placeholder="Tên Shop/Seller" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
              <Form.Control type="email" placeholder="Địa chỉ" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCheckbox">
              <Form.Check type="checkbox" label="By Signing Up, I Agree with Terms & Conditions" />
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '10px' }}>
              Sign Up
            </Button>
            <Button variant="secondary" type="button" style={{ width: '100%' }}>
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormGroupExample;
