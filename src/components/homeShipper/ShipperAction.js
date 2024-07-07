import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import BillDetailManager from "./BillDetailManager";
import BillDone from "./BillDone";
import BillOTW from "./BillOTW";
function ShipperAction() {
  return (
    <div id="wrapper" style={{ margin: "125px 30px" }}>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Giao dịch chưa được vận chuyển</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Giao dịch đang vận chuyển</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Giao dịch đã hoàn thành</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
              <BillDetailManager />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
              <BillOTW/>
              </Tab.Pane>
              <Tab.Pane eventKey="third">
              <BillDone/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default ShipperAction;
