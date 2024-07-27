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
                            <Form.Label>Sắp xếp theo</Form.Label>
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'order', value: e.target.value } });
                            }}>
                                <option value='ProductID asc'>ID tăng dần</option>
                                <option value='ProductID desc'>ID giảm dần</option>
                                <option value='ProductName asc'>Tên (A=&gt;Z) </option>
                                <option value='ProductName desc'>Tên (X=&gt;A) </option>
                                <option value='ProductPrice asc'>Giá (tăng dần) </option>
                                <option value='ProductPrice desc'>Giá (giảm dần) </option>
                                <option value='ProductSold asc'>Đã bán (tăng dần) </option>
                                <option value='ProductSold desc'>Đã bán (Giảm dần) </option>
                                <option value='Quantity asc'>Kho (Tăng dần) </option>
                                <option value='Quantity  desc'>Kho (giảm dần) </option>
                            </Form.Select>
                        </Col>
                        <Col>
                            <Col><Form.Label>Lọc theo trạng thái</Form.Label></Col>
                        </Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'status', value: e.target.value } });
                            }}>
                                <option value='%'>Chọn trạng thaí</option>
                                <option value='Đã xác thực'>Đã xác thực</option>
                                <option value='Chờ xác thực'>Chờ xác thực</option>
                                <option value='Đã xoá'>Đã xóa</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '10px' }}>
                        <Col><Form.Label>Lọc theo danh mục</Form.Label></Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'category', value: e.target.value } });
                            }}>
                                <option value='%'>Chọn danh mục</option>
                                {categories.map((category) => (
                                    <option value={category.CategoryID}>{category.CategoryName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col><Form.Label>Lọc theo người bán</Form.Label></Col>
                        <Col>
                            <Form.Select onChange={(e) => {
                                handleInputChange({ target: { name: 'seller', value: e.target.value } });
                            }}>
                                <option value='%'>Chọn người bán</option>
                                {sellers.map((seller) => (
                                    <option value={seller.SellerID}>{seller.SellerName}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Row><Form.Label>Lọc theo giá</Form.Label></Row>
                            <Row>
                                <Form.Range value={range} onChange={(e) => setRange(e.target.value)} />
                            </Row>
                            <Row style={{ marginBottom: '30px' }}>
                                <Form.Label>Chọn mức giá: {price === 100000000 ? (
                                    <span>Không giới hạn</span>
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
