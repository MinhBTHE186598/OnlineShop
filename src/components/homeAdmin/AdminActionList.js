import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import UserManager from './UserManger';
import BannerManager from './BannerManager';


function AdminAction() {
    const Arr = ['1', '2', '3', '4', '5'];

    return (
        <div id="wrapper" style={{ margin: '125px 30px' }}>

            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Quản lý người dùng</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Quản lý banner</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Quản lý sản phẩm </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Quản lý danh mục</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fifth">Quản lý phản hồi khách hàng </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <UserManager/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <BannerManager/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="fourth">
                                <Row>
                                    {Arr.map((index) => (
                                        <ListGroup key={index} horizontal className="my-2">
                                            <Col sm={9}><ListGroup.Item >Dong so {index}</ListGroup.Item></Col>
                                            <Col sm={2}><ListGroup.Item >action</ListGroup.Item></Col>
                                        </ListGroup>
                                    ))}
                                </Row>
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
                            <Tab.Pane eventKey="fifth">
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

export default AdminAction;