import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import PaidBill from "./PaidBill";
import DeliveryConfirm from "./DeliveryConfirm";

function UserAction() {
  return (
    <div id="wrapper" style={{ margin: "125px 30px" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Lịch sử đơn hàng</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Giao dịch đã hoàn thành</Nav.Link>
              </Nav.Item>
             
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <PaidBill/>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <DeliveryConfirm/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default UserAction;
