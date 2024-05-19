import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';

function LeftTabsExample() {
  return (
    <div id="wrapper" style={{margin: '125px 30px'}}>

    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Quản lý người dùng</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Quản lý sản phẩm</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Quản lý banner</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">Kiểm duyệt sản phẩm <Badge bg="warning" pill>14</Badge></Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="first">Quản lý ng dùng ở đây</Tab.Pane>
            <Tab.Pane eventKey="second">Quản lý sản phẩm ở đây</Tab.Pane>
            <Tab.Pane eventKey="third">Quản lý banner ở đây</Tab.Pane>
            <Tab.Pane eventKey="fourth">Kiểm duyệt sản phẩm ở đây</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
            
    </div>
  );
}

export default LeftTabsExample;