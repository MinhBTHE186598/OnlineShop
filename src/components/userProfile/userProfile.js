import React from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import EditProfileModal from './editProfile';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../utility/register.css';
import { Table } from 'react-bootstrap';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Profile(props) {
    const borderColor = '#0d6efd';
    const navigate = useNavigate();
    const { user, setUser, setUserRole, setIsLogin, isLogin } = useUser();

    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    

    const [sellerList, setSellerList] = useState([]);
    const [sellManagerList, setSellManagerList] = useState([]);
    const [AdminList, setAdminList] = useState([]);
    const [shipperList, setShipperList] = useState([]);


    React.useEffect(() => {
        fetch("http://localhost:5000/seller/get")
            .then(response => response.json())
            .then(data => {
                setSellerList(data)
            })
    }, [])

    React.useEffect(() => {
        fetch("http://localhost:5000/sellManager/get")
            .then(response => response.json())
            .then(data => {
                setSellManagerList(data)
            })
    }, [])

    React.useEffect(() => {
        fetch("http://localhost:5000/admin/get")
            .then(response => response.json())
            .then(data => {
                setAdminList(data)
            })
    }, [])

    React.useEffect(() => {
        fetch("http://localhost:5000/user/getShipper")
            .then(response => response.json())
            .then(data => {
                setShipperList(data)
            })
    }, [])

    const [userList, setUserList] = React.useState([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/user/get")
            .then(response => response.json())
            .then(data => {
                setUserList(data)
            })
    }, [])

    // useEffect(() => {
    //     setProfileRole(getRole(props.id));
    // }, []);

    const getRole = (id) => {
        const seller = sellerList.find(seller => seller.UserID === id);
        const sellManager = sellManagerList.find(sellManager => sellManager.UserID === id);
        const admin = AdminList.find(admin => admin.UserID === id);
        const shipper = shipperList.find(shipper => shipper.UserID === id);
        if (seller) return "Seller | SellerID:" + seller.SellerID;
        else if (sellManager) return "SellManager | SellManagerID:" + sellManager.SellManagerID;
        else if (admin) return "Admin | AdminID:" + admin.AdminID;
        else if (shipper) return "Shipper | ShipperID:" + shipper.ShipperID;
        else return "User";
    }

    const handleDelete = async (id) => {
        if (window.confirm("Bạn muốn xóa tài khoản này?")) {
            const response = await axios.delete(`http://localhost:5000/user/delete/${id}`);
            if(response.status === 200){
                console.log('User deleted successfully');
            }
            setUser(null);
            setIsLogin(false);
            setUserRole(null);
            navigate('/login');
            }
        }
    
    const isMyProfile = (user && user.UserID.toString() === props.id);

    const profile = userList.find(User => User.UserID.toString() === props.id);

    const [profileRole, setProfileRole] = useState("");

    useEffect(() => {
        if (profile) {
            setProfileRole(getRole(profile.UserID));
        }
    }, [profile]);


    const renderContent = () => {
        switch (true) {
            case (profileRole.startsWith("Seller")):
                return (
                    <Button style={{
                        width: '200px',
                        height: '50px',
                        marginTop: '15vh',
                        backgroundColor: 'white',
                        color: 'orange',
                        borderColor: 'orange',
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.color = 'white'
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'orange'
                        }}
                        onClick={() => { navigate('/sellerShopManage') }}>
                        Cửa Hàng Của Tôi
                    </Button>
                );
            case profileRole.startsWith("User"):
                return (
                    <Button style={{
                        width: '200px',
                        height: '50px',
                        marginTop: '15vh',
                        backgroundColor: 'white',
                        color: 'orange',
                        borderColor: 'orange',
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.color = 'white'
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'orange'
                        }}
                        onClick={() => { navigate('/addSeller') }}>
                        Đăng Ký Bán Hàng
                    </Button>
                );
            case (profileRole.startsWith("SellManager")):
                return (
                    <Button style={{
                        width: '200px',
                        height: '50px',
                        marginTop: '15vh',
                        backgroundColor: 'white',
                        color: 'orange',
                        borderColor: 'orange',
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.color = 'white'
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'orange'
                        }}
                        onClick={() => { navigate('/homeManager') }}>
                        Quản Lý Sellers
                    </Button>
                );
                case (profileRole.startsWith("Shipper")):
                return (
                    <Button style={{
                        width: '200px',
                        height: '50px',
                        marginTop: '15vh',
                        backgroundColor: 'white',
                        color: 'orange',
                        borderColor: 'orange',
                    }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'orange';
                            e.target.style.color = 'white'
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'orange'
                        }}
                        onClick={() => { navigate('/homeShipper') }}>
                        Quản Lý Đơn Hàng
                    </Button>
                );
            default:
                return null;
        }
    }

    return (
        isLogin ?(
        profile ? (
            <Container fluid style={{ backgroundColor: '#0d6efd', backgroundSize: 'cover', minHeight: '100vh', height: 'max-content', overflow: 'auto' }}>
                <Row>
                    <Col md={3} style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '8%', minHeight: '900px' }}>
                        <div style={{
                            width: '200px',
                            height: '200px',
                            borderRadius: '100%',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                            border: `1px solid ${borderColor}`,
                            marginTop: '20vh',
                            boxShadow: '0 6px 6px rgba(0, 0, 0, 0.1)',
                            position: 'relative',
                        }}>
                            <Image src={profile.UserPFP} fluid />
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
                            <h3 >{profile.UserFirstName} {profile.UserLastName}</h3>
                        </div>
                        <div>
                            <p style={{ marginBottom: '0px' }}>{profileRole} </p>
                        </div>
                        <div>
                            <p>UID: {profile.UserID}</p>

                        </div>
                        <hr style={{ color: 'red', width: '300px' }} />
                        {isMyProfile ? (
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                {renderContent(profileRole)}

                                <Button style={{
                                    width: '200px',
                                    height: '50px',
                                    marginTop: '10px',
                                    backgroundColor: 'white',
                                    color: `${borderColor}`,
                                }}
                                    onMouseEnter={(e) => {
                                        e.target.style.backgroundColor = `${borderColor}`;
                                        e.target.style.color = 'white'
                                    }}

                                    onMouseLeave={(e) => {
                                        e.target.style.backgroundColor = 'white';
                                        e.target.style.color = `${borderColor}`
                                    }}
                                    onClick={() => { setShowEdit(true) }}>
                                    Chỉnh Sửa Hồ Sơ
                                </Button>
                            </div>
                        ) : null}
                    </Col>

                    <Col md={7} style={{ backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '10px', marginBottom: '1px', minHeight: '900px', height: 'max-content' }}>
                        <div style={{ marginTop: '15vh', marginLeft: '5vh' }}>
                            <h1><b>HỒ SƠ CỦA TÔI</b></h1>
                            <p>Hãy cập nhật hồ sơ để tăng bảo mật cho tài khoản của bạn</p>
                        </div>
                        <hr style={{ color: 'red' }} />
                        <Table style={{
                            marginLeft: '3vw',
                            marginTop: '5vh',
                            border: '',
                            maxWidth: '50vw'
                        }}>
                            <tbody>
                                <tr style={{ borderTop: '1px solid black', borderBottom: '1px solid black', height: '50px' }}>
                                    <td></td>
                                    <td style={{ fontSize: '25px', width: '400px' }}><b>Thông tin tài khoản</b></td>
                                    <td ></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Tên đăng nhập</td>
                                    <td>{profile.UserAccountName}</td>
                                    <td></td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid black' }}>
                                    <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Mật khẩu</td>
                                    <td>***********</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid black', height: '50px' }}>
                                    <td></td>
                                    <td style={{ fontSize: '25px' }}><b>Phương thức liên lạc</b></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Địa chỉ</td>
                                    <td>{profile.UserAddress}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Email</td>
                                    <td>{profile.UserEmail}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Số điện thoại</td>
                                    <td >{profile.UserPhone}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Button style={{ position: 'absolute', marginBottom: '10vh', marginLeft: '10vw', width: '40vw', height: '50px', backgroundColor: 'white', color: `${borderColor}` }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = `${borderColor}`;
                                e.target.style.color = 'white'
                            }}

                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.color = `${borderColor}`
                            }}
                            onClick={() => { navigate('/contact') }}
                        >
                             Bạn đang gặp vấn đề? Liên hệ với chúng tôi ngay!
                        </Button>
                        {isMyProfile ? (
                            <Button style={{ marginTop: '7vh', marginLeft: '10vw', width: '40vw', height: '50px', backgroundColor: 'white', borderColor: 'red', color: `red` }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = `red`;
                                    e.target.style.color = 'white'
                                }}

                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = `red`
                                }}
                                onClick={() => handleDelete(user.UserID)}
                            >
                                TÔI MUỐN XOÁ TÀI KHOẢN CỦA MÌNH
                            </Button>
                        ) : null}
                    </Col>
                </Row>
                <EditProfileModal show={showEdit} onHide={handleCloseEdit} />
            </Container>
        ) : null
    ) : navigate('/notfound')
    );
}

export default Profile;