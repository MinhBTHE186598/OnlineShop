import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import SellerManager from './SellerManager'

function ManagerAction() {
    const Arr = ['1', '2', '3', '4', '5'];

    return (
        <div id="wrapper" style={{ margin: '125px 30px' }}>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Quản lý Seller</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Quản lý sản phẩm (phê duyệt) </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <SellerManager/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <Row>
                                    {Arr.map((index) => (
                                        <ListGroup key={index} horizontal className="my-2">
                                            <Col sm={9}><ListGroup.Item >Dong so {index}</ListGroup.Item></Col>
                                            <Col sm={2}><ListGroup.Item >action</ListGroup.Item></Col>
                                        </ListGroup>
                                    ))}
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <Row>
                                    {Arr.map((index) => (
                                        <ListGroup key={index} horizontal className="my-2">
                                            <Col sm={9}><ListGroup.Item >Dong so {index}</ListGroup.Item></Col>
                                            <Col sm={2}><ListGroup.Item >action</ListGroup.Item></Col>
                                        </ListGroup>
                                    ))}
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    );
}

export default ManagerAction;