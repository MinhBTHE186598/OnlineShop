import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import logo from '../../utility/testlogo.png'; // Adjust the path as necessary
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
function FormGroupExample() {
  const [SellerName, setPName] = useState('');
  const [SellerAddress, setAddress] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/seller/addSeller', {
        SellerName,
        SellerAddress,
      });
      if (response.status === 201) {
        console.log('Seller added successfully');
      } else {
        console.error('Failed to add Seller');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (

    <Container fluid style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
      <Row style={{ width: '80%', maxWidth: '1000px', backgroundColor: '#f0f0f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <Col md={6} style={{ backgroundColor: '#343a40', color: '#ffffff', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Image src={logo} roundedCircle style={{ width: '100%', marginBottom: '20px' }} />
        </Col>
        <Col md={6} style={{ padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2>Đăng kí bán hàng</h2>
          <p>Làm chủ cuộc chơi của bạn</p>
          <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Form.Group className="mb-3" controlId="formGroupName">
              <Form.Control type="text" placeholder="Tên Shop/Seller" onChange={(e) => setPName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupAddress">
              <Form.Control type="text" placeholder="Địa chỉ" onChange={(e) => setAddress(e.target.value)} required  />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupCheckbox">
              <Form.Check type="checkbox" label="By Signing Up, I Agree with Terms & Conditions" required/>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ width: '100%', marginBottom: '10px' }} >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormGroupExample;
