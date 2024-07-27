import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import CateTable from './CateTable';
import { Button } from 'react-bootstrap';
import AddCateModal from './AddCateModal';
import axios from 'axios';

export default function CategoryManager() {
    const [categories, setCategories] = useState([{}])
    const [show, setShow] = useState(false)

    useEffect(() => {
        fetch("http://localhost:5000/category/getCategoryQuantity").then(
            response => response.json()
        ).then(
            data => {
                setCategories(data)
            }
        )
    }, [])

    const deleteCate = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/category/delCate/${id}`);

            if (response.status === 200) {
                console.log('Category deleted successfully');
                // Handle success (e.g., update the UI)
            } else {
                console.error('Failed to delete category');
                // Handle failure
            }
            setCategories(categories.filter((cate) => cate.CategoryID !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleChange = (newCate, method) => {
        if(method==="add"){
            setCategories([...categories, newCate])
        }
        if(method==="edit"){
            setCategories(categories.map(category=>category.CategoryID===newCate.CategoryID ? newCate:category))
        }
    }



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
                        <Button style={{ marginTop: '10px' }} onClick={() => setShow(true)}>Manage</Button>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            {categories.map((category) => (
                                <Tab.Pane eventKey={category.CategoryID}>
                                    {category.counts === 0 ? (<div>Không có sản phẩm nào :(</div>) : (<CateTable id={category.CategoryID} categories={categories}/>)}

                                </Tab.Pane>
                            ))}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <AddCateModal show={show} onHide={() => setShow(false)} handleChange={handleChange}
            categories={categories} handleDelete={deleteCate}/>
        </div>
    );
}