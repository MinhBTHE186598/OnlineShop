import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Container, Form } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import SellerProduct from './sellerProductList';
import { useParams } from 'react-router-dom'

function SellerShop() {
    const Arr = ['1', '2', '3', '4', '5'];
    const { id } = useParams();

    const { user } = useUser();

    const [sellerList, setSellerList] = useState([]);
    const [sellManagerList, setSellManagerList] = useState([]);

    const [userList, setUserList] = React.useState([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/user/get")
            .then(response => response.json())
            .then(data => {
                setUserList(data)
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/seller/get")
            .then(response => response.json())
            .then(data => {
                setSellerList(data)
            })
    }, []);

    const myshop = sellerList.find(seller => seller.UserID === user.UserID);

    const [managerInf, setManagerInf] = React.useState({});
    useEffect(() => {
        if (myshop)
            setManagerInf(sellManagerList.find(manager => manager.UserID === myshop.UserID));
    }, [myshop]);

    React.useEffect(() => {
        fetch("http://localhost:5000/sellManager/getInf")
            .then(response => response.json())
            .then(data => {
                setSellManagerList(data)
            })
    }, [])

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/user/update', {

            });
            if (response.status === 200) {
                console.log('updated');
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        myshop ? (
            <Container fluid style={{ height: 'max-content', minHeight: '100vh', marginTop: '70px', backgroundColor: '#B1B1B1', overflow: 'auto' }}>
                <Row style={{ display: 'flex', backgroundColor: 'white', width: '90vw', height: 'max-content', minHeight: '20vh', margin: '5vh auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Col md={3}>
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            border: `1px solid black`,
                            margin: '10px',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                        }}>
                            <Image src={user.UserPFP} fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h4 style={{ marginLeft: '8vh' }}>UserID: {user.UserID}</h4>
                    </Col>
                    <Col md={6} style={{ margin: '10px' }}>
                        <h3>SellerID: {myshop.SellerID}</h3>
                        <h3>SellerName: {myshop.SellerName}</h3>
                        <h3>SellerAddress: {myshop.SellerAddress}</h3>
                        <hr />
                        <h3>In charge SellManager ID: {myshop.SellManagerID}</h3>
                    </Col>
                </Row>
                <Row style={{ display: 'flex', backgroundColor: 'white', width: '90vw', height: 'max-content', minHeight: '20vh', margin: '5vh auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>

                    <div id="wrapper" style={{ margin: '50px 30px' }}>

                        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Row>
                                <Col sm={3}>
                                    <Nav variant="pills" className="flex-column">
                                        <Nav.Item>
                                            <Nav.Link eventKey="first">Tất Cả Sản Phẩm</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="third">Sản Phẩm Đang Bán</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fourth">Sản Phẩm Chờ Duyệt </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="second">Đánh Giá Của Tôi</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="fifth">Tìm Kiếm Sản Phẩm</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <SellerProduct id={myshop.SellerID} />
                                        </Tab.Pane>

                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>

                    </div>

                </Row>
            </Container>
        ) : null
    );
}

export default SellerShop;