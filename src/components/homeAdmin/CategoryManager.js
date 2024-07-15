import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import CateTable from './CateTable';

export default function CategoryManager() {
    const [categories, setCategories] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/category/getCategoryQuantity").then(
            response => response.json()
        ).then(
            data => {
                setCategories(data)
            }
        )
    }, [])


    return (
        <div style={{ backgroundColor: 'lightgrey', padding: '20px', minHeight: '63vh' }}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="1" >
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            {categories.map((category) => (
                                <Nav.Item>
                                    <div className="ms-2 me-auto" style={{ width: '100%' }}>
                                        <Nav.Link eventKey={category.CategoryID}>
                                            {category.CategoryName}
                                            <Badge bg="warning" pill style={{ marginLeft: '10px' }}>
                                                {category.counts}
                                            </Badge>
                                        </Nav.Link>
                                    </div>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {categories.map((category) => (
                                <Tab.Pane eventKey={category.CategoryID}>
                                    <CateTable id={category.CategoryID}/>
                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}