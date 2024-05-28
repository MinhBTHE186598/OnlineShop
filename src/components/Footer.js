import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../utility/testlogo.png';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";


const ColStyle = {
  marginTop: '2vh'
}

const TextStyle = {
  marginTop: '2vh',
  color: 'orange',
}

const IconListStyle = {
  marginTop:'2vh',
  color:'orange',
  display:'flex',
  gap:'1vw',
  fontSize:'300%'
}

function footer() {
  return (
    <div style={{ backgroundColor: '#222', height: '25vh' }}>
      <Container>
        <Row>
          <Col>
            <img src={logo} style={{ height: '25vh' }} alt='logo' />
          </Col>
          <Col style={ColStyle}>
            <h3 className='text-secondary'>Tìm chúng tôi trên:</h3>
            <div className='IconList' style={IconListStyle}>
              <FaFacebook />
              <FaYoutube />
              <AiFillTikTok />
              <FaGithub />
            </div>
          </Col>
          <Col style={ColStyle}>
            <h3 className='text-secondary'>Hoặc liên hệ qua</h3>
            <h5 style={TextStyle}>Email: Example@example.com</h5>
            <h5 style={TextStyle}>Phone: 0912.345.678</h5>
            <h5 style={TextStyle}>Địa chỉ: Hòa Lạc, Thạch Thất, Hà Nội</h5>
          </Col>
          <Col style={ColStyle}>
            <h3 className='text-secondary'>Điều hướng nhanh</h3>
            <h5 style={TextStyle}><Link to="/" style={{ textDecoration: 'none', color: 'orange' }}>Trang chủ</Link></h5>
            <h5 style={TextStyle}><a href='/mainShop' style={{ textDecoration: 'none', color: 'orange' }}>Tất cả sản phẩm</a></h5>
            <h5 style={TextStyle}><a href='#home' style={{ textDecoration: 'none', color: 'orange' }}>Hỗ trợ</a></h5>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default footer