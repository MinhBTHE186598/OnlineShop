import React from 'react'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import logo from '../utility/testlogo.png'

function header() {
  return (
    <Navbar expand="lg" className="bg-dark p-0" style={{ fontSize: 'larger', height: '10vh', display: 'flex', justifyContent: 'space-between' }} fixed='top'>
      <Container style={{ width: '33vw' }}>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} style={{ width: '5em' }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/aboutUs" className='link-light link-opacity-50-hover'>Về chúng tôi</Nav.Link>
            <Nav.Link href="#link" className='link-light link-opacity-50-hover'>Hỗ trợ</Nav.Link>
            <NavDropdown title={<span className="text-white my-auto">Danh mục sản phẩm</span>} id="nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Mục A</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Mục B</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Mục C</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.4">Mục D</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form inline style={{ width: '33vw'}}>
        <InputGroup>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary" id="button-addon2">
            <FaMagnifyingGlass/>
          </Button>
        </InputGroup>
      </Form>
      <ButtonToolbar aria-label="Toolbar with button groups" style={{ width: '33vw', display: 'flex',justifyContent:'center' }}>
        <ButtonGroup className="m-1" aria-label="First group">
          <DropdownButton as={ButtonGroup} title={<FaBell />} id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
        <ButtonGroup className="m-1" aria-label="Second group">
          <DropdownButton as={ButtonGroup} title={<FaShoppingCart />} id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
        <ButtonGroup className="m-1" aria-label="Third group">
          <DropdownButton as={ButtonGroup} title="Welcome back, User" id="bg-nested-dropdown">
            <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
            <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </ButtonToolbar>
    </Navbar>
  )
}

export default header