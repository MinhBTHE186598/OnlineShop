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
import logo from '../../utility/testlogo.png';
import { useUser } from '../context/UserContext';
import { useNavigate  } from "react-router-dom";

function Header() { 
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/category/getCategories")
      .then(response => response.json())
      .then(data => {
        setCategories(data)
      })
  }, [])

  const navigate = useNavigate();
  const { user, setUser, userRole, setUserRole, isLogin, setIsLogin } = useUser();
  const logOut = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      setUser(null);
      setIsLogin(false);
      setUserRole(null);
      navigate('/login');
    }
    return null;
  }
  const handleAdminNavi = () => {
    if (userRole === 'Admin') {
        navigate('/homeAdmin');
    } else {
        alert('You do not have permission to access this page.');
    }
};
  return (
    <Navbar expand="lg" className="bg-dark p-0" style={{ height: '10vh', display: 'flex', justifyContent: 'space-between' }} fixed='top'>
      <Container style={{ width: '33vw' }}>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} style={{ width: '5em' }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/aboutUs" className='link-light link-opacity-50-hover'>Về chúng tôi</Nav.Link>
            <Nav.Link href="/contact" className='link-light link-opacity-50-hover'>Hỗ trợ</Nav.Link>
            <NavDropdown title={<span className="text-white my-auto">Danh mục sản phẩm</span>} id="nav-dropdown">
              <NavDropdown.Item href='/mainShop'>Tất cả sản phẩm</NavDropdown.Item>
              {categories.map((category) => (
                <NavDropdown.Item href={`/mainShop/${category.CategoryID}`} onClick={() => window.location.reload()} key={category.CategoryID} >{category.CategoryName}</NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form inline="true" style={{ width: '33vw', display: 'flex', justifyContent: 'center',alignItems: 'center' }}>
        <InputGroup style={{margin: 0}}>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <Button variant="primary" id="button-addon2">
            <FaMagnifyingGlass />
          </Button>
        </InputGroup>
      </Form>
      {isLogin ? (<ButtonToolbar aria-label="Toolbar with button groups" style={{ width: '33vw', display: 'flex', justifyContent: 'center' }}>
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
          <DropdownButton as={ButtonGroup} title={`Chào mừng trở lại, ${user.UserFirstName}`} id="bg-nested-dropdown">
            <Dropdown.Item onClick={() => navigate(`/profile/${user.UserID}`)}>Hồ Sơ Của Tôi</Dropdown.Item>
            {/* Neu nhu roll la admin thi moi hien ra System manager*/}
            {userRole==='Admin'&&(<Dropdown.Item onClick={handleAdminNavi} >System Manager</Dropdown.Item>)}
            <Dropdown.Item >{userRole}</Dropdown.Item>
            <Dropdown.Item onClick={logOut}>Đăng xuất</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </ButtonToolbar>) : (<div style={{ width: '33vw', display: 'flex', justifyContent: 'center',alignItems: 'center' }}><Button className="btn btn-lg btn-primary" >
        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Đăng nhập</Link></Button></div>)
      }


    </Navbar >
  )
}

export default Header