import Offcanvas from 'react-bootstrap/Offcanvas';
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

export default function FilterOffcanvas({ show, handleClose, handleInputChange }) {
    const [price, setPrice] = useState(100000000)
    const [range, setRange] = useState(100)
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

    useEffect(() => {
        if (Number(range) === 100) {
            setPrice('No Limit')
            handleInputChange({ target: { name: 'price', value: 100000000 } })
        } else if (range < 100) {
            setPrice(range*10000)
            handleInputChange({ target: { name: 'price', value: price } })
        }
    }, [range,price,handleInputChange])

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
                             <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'order', value: e.target.value } });
                            }}>
                                <option value='ProductID asc'>Product ID</option>
                                <option value='ProductName asc'>Product Name (A=&gt;Z) </option>
                                <option value='ProductName desc'>Product Name (X=&gt;A) </option>
                                <option value='ProductPrice asc'>Product Price (Low to high) </option>
                                <option value='ProductPrice desc'>Product Price (High to Low) </option>
                                <option value='ProductSold asc'>Product Sold (Low to high) </option>
                                <option value='ProductSold desc'>Product Sold (High to Low) </option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Form.Label>Filter by price</Form.Label>
                    </Row>
                    <Row>
                        {/* <input type='range' name='price' min={0} max={100000000} value={price} onChange={(e) => setPrice(e.target.value)} /> */}
                         <Form.Range value={range} onChange={(e) => setRange(e.target.value)} /> 
                    </Row>
                    <Row style={{ marginBottom: '30px' }}>
                        <Form.Label>Selected Price: {price}</Form.Label>
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
                    <Row style={{ marginBottom: '30px' }}>
                        <Col><Form.Label>Filter by Category</Form.Label></Col>
                        <Col>
                            <Form.Select>
                                <option>Choose Category</option>
                                {categories.map((category) => (
                                    <option>{category.CategoryName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '30px' }}>
                        <Col><Form.Label>Filter by Seller</Form.Label></Col>
                        <Col>
                            <Form.Select>
                                <option>Choose Seller</option>
                                {sellers.map((seller) => (
                                    <option>{seller.SellerName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>


                    {/* <Button>Apply</Button> */}
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    )
}