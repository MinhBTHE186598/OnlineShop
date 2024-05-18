import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaMagnifyingGlass } from "react-icons/fa6";
import logo from '../logo.svg'

function header() {
  return (
    <div>
      <Navbar expand="lg" className="bg-secondary" style={{ padding: '20px 0', fontSize: 'larger' }}>
        <Container>
          <Navbar.Brand href="#home" className='link-light link-opacity-50-hover'>img</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className='link-light link-opacity-50-hover'>Về chúng tôi</Nav.Link>
              <Nav.Link href="#link" className='link-light link-opacity-50-hover'>Hỗ trợ</Nav.Link>
              <NavDropdown title={<span className="text-white my-auto">Danh mục sản phẩm</span>} id="nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Mục A</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Mục B</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Mục C</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Mục D</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Form inline style={{ marginRight: '5%', width: "15vw" }}>
          <Row>
            <Col xs="auto" className='p-1' style={{ width: "80%" }}>
              <Form.Control type="text" placeholder="Search" />
            </Col>
            <Col xs="auto" className='p-1'>
              <Button type="submit"> <FaMagnifyingGlass size={"20px"} /> </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>
    </div>
  )
}

export default header