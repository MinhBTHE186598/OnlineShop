import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';

export default function FilterOffcanvas({ show, handleClose }) {
    const [price, setPrice] = useState(0)
    const [categories, setCategories] = useState([]);
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/category/getCategories")
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/seller/get")
          .then(response => response.json())
          .then(data => {
            setSellers(data)
          })
      }, [])

    return (
        <Offcanvas placement='end' show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter Product</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <Row style={{ marginBottom: '30px' }}>
                        <Col>
                            <Form.Label>Sort By</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select>
                                <option>Product ID</option>
                                <option>Product Name (A=&gt;Z) </option>
                                <option>Product Name (X=&gt;A) </option>
                                <option>Product Price (Low to high) </option>
                                <option>Product Price (High to Low) </option>
                                <option>Product Sold (Low to high) </option>
                                <option>Product Sold (High to Low) </option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label>Filter by price</Form.Label>
                    </Row>
                    <Row>
                        <Form.Range value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Row>
                    <Row style={{ marginBottom: '30px' }}>
                        <Form.Label>Selected Value: {price}</Form.Label>
                    </Row>
                    <Row style={{ marginBottom: '30px' }}>
                        <Col><Form.Label>Filter by Status</Form.Label></Col>
                        <Col>
                            <Form.Select>
                                <option>Choose status</option>
                                <option>Đã xác thực</option>
                                <option>Chờ xác thực</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row  style={{ marginBottom: '30px' }}>
                        <Col><Form.Label>Filter by Category</Form.Label></Col>
                        <Col>
                            <Form.Select>
                                <option>Choose Category</option>
                                {categories.map((category)=>(
                                    <option>{category.CategoryName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row  style={{ marginBottom: '30px' }}>
                        <Col><Form.Label>Filter by Seller</Form.Label></Col>
                        <Col>
                            <Form.Select>
                                <option>Choose Seller</option>
                                {sellers.map((seller)=>(
                                    <option>{seller.SellerName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    

                    <Button>Apply</Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}