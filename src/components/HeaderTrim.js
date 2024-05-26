import React from 'react'
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../utility/testlogo.png'

function HeaderTrim() {
    return (
        <Navbar expand="lg" className="bg-dark p-0" style={{ fontSize: 'larger', height: '10vh', display: 'flex', justifyContent: 'space-between' }} fixed='top'>
        <Container style={{ width: '66vw' }}>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} style={{ width: '5em' }} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className='link-light link-opacity-50-hover'>Về chúng tôi</Nav.Link>
              <Nav.Link href="#link" className='link-light link-opacity-50-hover'>Hỗ trợ</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default HeaderTrim