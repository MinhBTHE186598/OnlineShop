import { Collapse } from "react-bootstrap";
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import MoneyForm from "../common/MoneyForm";

export default function FilterCollapse({ open, handleInputChange }) {
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
            setPrice(100000000)
            handleInputChange({ target: { name: 'price', value: [0, 100000000] } })
        } else if (range < 100) {
            setPrice(range * 10000)
            handleInputChange({ target: { name: 'price', value: [0, price] } })
        }
    }, [range, price])
    return (
        <div style={{ borderStyle: "unset" }}>
            <Collapse in={open} >
                <Form>
                    <Row style={{ marginBottom: '10px' }}>
                        <Col>
                            <Form.Label>Sort By</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'order', value: e.target.value } });
                            }}>
                                <option value='ProductID asc'>Product ID asc</option>
                                <option value='ProductID desc'>Product ID desc</option>
                                <option value='ProductName asc'>Product Name (A=&gt;Z) </option>
                                <option value='ProductName desc'>Product Name (X=&gt;A) </option>
                                <option value='ProductPrice asc'>Product Price (Low to high) </option>
                                <option value='ProductPrice desc'>Product Price (High to Low) </option>
                                <option value='ProductSold asc'>Product Sold (Low to high) </option>
                                <option value='ProductSold desc'>Product Sold (High to Low) </option>
                                <option value='Quantity asc'>Stock (Low to high) </option>
                                <option value='Quantity  desc'>Stock (High to Low) </option>
                            </Form.Select>
                        </Col>
                     
                    </Row>
                    <Row style={{ marginBottom: '10px' }}>
                        <Col><Form.Label>Filter by Category</Form.Label></Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'category', value: e.target.value } });
                            }}>
                                <option value='%'>Choose Category</option>
                                {categories.map((category) => (
                                    <option value={category.CategoryID}>{category.CategoryName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col><Form.Label>Filter by Seller</Form.Label></Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'seller', value: e.target.value } });
                            }}>
                                <option value='%'>Choose Seller</option>
                                {sellers.map((seller) => (
                                    <option value={seller.SellerID}>{seller.SellerName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Row><Form.Label>Filter by price</Form.Label></Row>
                            <Row>
                                <Form.Range value={range} onChange={(e) => setRange(e.target.value)} />
                            </Row>
                            <Row style={{ marginBottom: '30px' }}>
                                <Form.Label>Selected Price: {price === 100000000 ? (
                                    <span>No Limit</span>
                                ) : (
                                    <span>0đ - <MoneyForm value={price}/></span>
                                )}</Form.Label>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Collapse>
        </div>
    )
}
