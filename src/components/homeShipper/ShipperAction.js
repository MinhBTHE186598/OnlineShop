import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import ShipperManager from "./ShipperManager";
import BillDetailManager from "./BillDetailManager";
import BillAccepted from "./BillAccepted";
function ShipperAction() {
  return (
    <div id="wrapper" style={{ margin: "125px 30px" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Danh sách Shipper</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Giao dịch chưa được ship</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Giao dịch đã hoàn thành</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ShipperManager />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <BillDetailManager />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <BillAccepted/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default ShipperAction;
