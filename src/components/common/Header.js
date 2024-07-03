import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBell, FaShoppingCart } from "react-icons/fa";
import logo from "../../utility/testlogo.png";
import { useUser } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";
import '../../utility/noArrow.css';
import axios from "axios";
import { Col } from "react-bootstrap";

const reformat = new Intl.NumberFormat('en-US', {

})

function Header() {
  const [categories, setCategories] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();
  const { user, setUser, userRole, setUserRole, isLogin, setIsLogin, userCart, setUserCart } =
    useUser();
  const logOut = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất?")) {
      setUser(null);
      setIsLogin(false);
      setUserRole(null);
      setUserCart(null);
      navigate("/login");
    }
    return null;
  };

  const handleAdminNavi = () => {
    if (userRole === "Admin") {
      navigate("/homeAdmin");
    } else {
      alert("You do not have permission to access this page.");
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/product/get`);
      setProductList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/category/getCategories`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLogin && userCart) {
      function fetchCart() {
        axios
          .get(`http://localhost:5000/bill/getBillDetailByBillID/${userCart.BillID}`)
          .then((response) => {
            setCartList(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      fetchCart();
      fetchProduct();
      fetchCategory();
    }
  }, [userCart]);

  return (
    <Navbar
      expand="lg"
      className="bg-dark p-0"
      style={{
        height: "10vh",
        display: "flex",
        justifyContent: "space-between",
      }}
      fixed="top"
    >
      <Container style={{ width: "33vw" }}>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} style={{ width: "5em" }} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="/aboutUs"
              className="link-light link-opacity-50-hover"
            >
              Về chúng tôi
            </Nav.Link>
            <Nav.Link
              href="/contact"
              className="link-light link-opacity-50-hover"
            >
              Hỗ trợ
            </Nav.Link>
            <NavDropdown
              title={
                <span className="text-white my-auto">Danh mục sản phẩm</span>
              }
              id="nav-dropdown"
            >
              <NavDropdown.Item href="/mainShop">
                Tất cả sản phẩm
              </NavDropdown.Item>
              {categories.map((category) => (
                <NavDropdown.Item
                  href={`/mainShop/${category.CategoryID}`}
                  onClick={() => window.location.reload()}
                  key={category.CategoryID}
                >
                  {category.CategoryName}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Form
        inline="true"
        style={{
          width: "33vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputGroup style={{ margin: 0 }}>
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
      {isLogin ? (
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          style={{ width: "33vw", display: "flex", justifyContent: "center" }}
        >
          <ButtonGroup className="m-1" aria-label="First group">
            <DropdownButton
              as={ButtonGroup}
              title={<FaBell />}
              id="bg-nested-dropdown"
            >
              <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
              <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup className="m-1" aria-label="Second group">
            <DropdownButton
              as={ButtonGroup}
              title={<FaShoppingCart />}
              id="bg-nested-dropdown"
            >
              <Dropdown.Item style={{ padding: "10px", textAlign: "center", borderBottom: "solid 1px black", pointerEvents: 'none' }}> <h3 style={{ margin: 0 }}>Giỏ hàng của bạn</h3></Dropdown.Item>
              <div style={{ width: "100%", maxHeight: "40vh", overflowY: "auto" }}>
                {cartList.length === 0 ? (
                  <Dropdown.Item
                    style={{
                      textAlign: "center",
                      backgroundColor: "#fff",
                      pointerEvents: 'none',
                      marginTop: "10px",
                    }}
                  >
                    <p>Chưa có sản phẩm</p>
                  </Dropdown.Item>
                ) : (
                  cartList.map((item, index) => (
                    productList.map((product) => (
                      product.ProductID === item.ProductID &&
                      <Dropdown.Item
                        key={item.BillDetailID}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: index % 2 === 0 ? "#fff" : "#eee",
                          pointerEvents: 'none',
                        }}
                      >
                        <Col md="3">
                          <img
                            src={product.ProductPic}
                            style={{ width: "5em", height: "5em", borderRadius: "50%", border: "solid 1px black" }}
                            alt="Logo"
                          />
                        </Col>
                        <Col md="9" style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <p style={{ margin: "0 0 0 10px", padding: 0 }}>{product.ProductName}</p>
                          <p style={{ margin: "0 0 0 10px", padding: 0 }}>Số lượng: {item.BillQuantity}</p>
                          <p style={{ margin: "0 0 0 10px", padding: 0 }}>Giá: {reformat.format(product.ProductPrice)}đ</p>
                        </Col>
                      </Dropdown.Item>
                    ))
                  ))
                )}
              </div>
              <Dropdown.Item onClick={() => navigate(`/cart`)} style={{ display: "flex", justifyContent: "center", padding: '10px 0', backgroundColor: '#0d6efd', color: 'white' }}> Xem chi tiết</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
          <ButtonGroup className="m-1" aria-label="Third group">
            <DropdownButton
              as={ButtonGroup}
              title={`Chào mừng trở lại, ${user.UserFirstName} ${user.UserLastName}`}
              id="bg-nested-dropdown"
            >
              <Dropdown.Item
                onClick={() => navigate(`/profile/${user.UserID}`)}
                style={{ marginTop: '10px' }}
              >
                Hồ Sơ Của Tôi
              </Dropdown.Item>
              {/* Neu nhu role la admin thi moi hien ra System manager*/}
              {userRole === "Admin" && (
                <Dropdown.Item onClick={handleAdminNavi}>
                  System Manager
                </Dropdown.Item>
              )}
              <Dropdown.Item onClick={() => navigate(`/cart`)}>Giỏ hàng của tôi</Dropdown.Item>
              <Dropdown.Item onClick={logOut} style={{ marginBottom: "10px" }}>Đăng xuất</Dropdown.Item>
            </DropdownButton>
          </ButtonGroup>
        </ButtonToolbar>
      ) : (
        <div
          style={{
            width: "33vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button className="btn btn-lg btn-primary">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Đăng nhập
            </Link>
          </Button>
        </div>
      )}
    </Navbar>
  );
}

export default Header;
