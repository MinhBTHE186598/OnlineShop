import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import SellerManager from "./SellerManager";
import ProductManager from "./ProductManager";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from 'react';

function ManagerAction() {
  const { user} = useUser();
  const [managers, setManager] = useState([{}]);

  useEffect(() => {
    fetch("http://localhost:5000/sellManager/get").then(
      response => response.json()
    ).then(
      data => {
        setManager(data)
      }
    )
  }, [])

  function getManagerID(id) {
    let intID = +id;
    let manager = managers.find(manager => manager.UserID === intID)
    return manager ? manager.SellManagerID : 0
  }


  return (
    <div id="wrapper" style={{ margin: "125px 30px" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Quản lý Seller</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  Quản lý sản phẩm (phê duyệt)
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <SellerManager id={getManagerID(user.UserID)}/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <ProductManager />
              </Tab.Pane>
        
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default ManagerAction;
