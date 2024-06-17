import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import SellerManager from "./SellerManager";
import ProductManager from "./ProductManager";

function ManagerAction() {
  const Arr = ["1", "2", "3", "4", "5"];

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
                <SellerManager />
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
