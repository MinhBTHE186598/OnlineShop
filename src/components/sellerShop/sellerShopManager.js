
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";
import React from "react";
// import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import SellerProduct from './sellerProductList';
// import { useParams } from 'react-router-dom'
import bgi from '../../utility/background_1.jpg';
import EditProfileModal from "./EditShopProfileModal";

function SellerShop() {
    // const Arr = ['1', '2', '3', '4', '5'];
    // const { id } = useParams();

    const { user } = useUser();

    const [sellerList, setSellerList] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);

    const [profileInf, setProfileInf] = useState({});
    // const [userList, setUserList] = React.useState([]);

    const editProfile = (profile) => {
        setProfileInf(profile);
        setShowEdit(true);
    }

    // React.useEffect(() => {
    //     fetch("http://localhost:5000/user/get")
    //         .then(response => response.json())
    //         .then(data => {
    //             setUserList(data)
    //         })
    // }, [])

    useEffect(() => {
        fetch("http://localhost:5000/seller/get")
            .then(response => response.json())
            .then(data => {
                setSellerList(data)
            })
    }, []);

    const myshop = sellerList.find(seller => seller.UserID === user.UserID);

    // const [managerInf, setManagerInf] = React.useState({});
    // useEffect(() => {
    //     if (myshop)
    //         setManagerInf(sellManagerList.find(manager => manager.UserID === myshop.UserID));
    // }, [myshop]);

    // React.useEffect(() => {
    //     fetch("http://localhost:5000/sellManager/getInf")
    //         .then(response => response.json())
    //         .then(data => {
    //             setSellManagerList(data)
    //         })
    // }, [])


    return (
        myshop ? (
            <Container fluid style={{ height: 'max-content', minHeight: '100vh', marginTop: '70px', backgroundImage: `url(${bgi})`, overflow: 'auto' }}>
                <Row style={{ display: 'flex', backgroundColor: 'white', width: '90vw', height: 'max-content', minHeight: '20vh', margin: '5vh auto', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <Col md={3}>
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '10%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            border: `3px solid pink`,
                            margin: '10px',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                        }}>
                            <Image src={user.UserPFP} fluid style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <h4 style={{ marginLeft: '8vh' }}><b>UserID: {user.UserID}</b></h4>
                    </Col>
                    <Col md={6} style={{ margin: '10px' }}>
                        <h2 style={{ textAlign: 'center' }}><b>Thông Tin Cửa Hàng</b></h2>
                        <hr style={{color:'red'}}/>
                        <h4>ID Cửa Hàng: {myshop.SellerID}</h4>
                        <h4>Tên Cửa Hàng: {myshop.SellerName}</h4>
                        <h4>Địa Chỉ: {myshop.SellerAddress}</h4>
                        <hr style={{color:'red'}}/>
                        <h3>ID Người Quản Lý : {myshop.SellManagerID}</h3>
                    </Col>
                    <Col md={2} style={{ margin: '25px' }}>
                    <Button variant="primary" onClick={() => { editProfile(myshop) }} style={{ marginTop: '10px', marginLeft: '10px', width: '100%', height: '75px' }}>Sửa Thông Tin Cửa Hàng</Button>
                    <Button variant="primary" style={{ marginTop: '10px', marginLeft: '10px', width: '100%', height: '75px', backgroundColor: 'red' }}>TÔI MUỐN XOÁ CỬA HÀNG</Button>
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
                <EditProfileModal show={showEdit} onHide={handleCloseEdit} profile={profileInf} />
            </Container>
        ) : null
    );
}

export default SellerShop;