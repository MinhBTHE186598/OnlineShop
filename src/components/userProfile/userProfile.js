import React from 'react';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import axios from 'axios';
import Image from 'react-bootstrap/Image';
import logo from '../../utility/testlogo.png';
import bgi from '../../utility/background_1.jpg';
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
    const { user, setUser, userRole, setUserRole, isLogin, setIsLogin } = useUser();

    const [userList, setUserList] = React.useState([]);
    React.useEffect(() => {
        fetch("http://localhost:5000/user/get")
          .then(response => response.json())
          .then(data => {
            setUserList(data)
          })
      }, [])

    const handleDelete = (user) => {
        if (window.confirm("Bạn muốn xóa tài khoản này?")) {
            fetch(`http://localhost:5000/user/delete/${user.UserID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                
            })})
            setUser(null);
            setIsLogin(false);
            setUserRole(null);
            navigate('/login');
        }
    }
    const isMyProfile = (user && user.UserID.toString() === props.id);

    const profile = userList.find(User=> User.UserID.toString() === props.id);
    return (
        profile ? (
        <Container fluid style={{ backgroundImage: `url(${bgi})`, backgroundSize: 'cover', minHeight: '900px' }}>
            <Row>
                <Col md={3} style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '8%', minHeight: '900px' }}>
                    <div style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: `1px solid ${borderColor}`,
                        marginTop: '20vh',
                        boxShadow: '0 6px 6px rgba(0, 0, 0, 0.1)',
                    }}>
                        <Image src={profile.UserPFP} roundedCircle fluid />
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
                        <h3>{profile.UserFirstName} {profile.UserLastName}</h3>
                    </div>
                    <div>
                        <p style={{ marginBottom: '0px' }}>{userRole}</p>
                    </div>
                    <div>
                        <p>ID: {profile.UserID}</p>

                    </div>
                    <hr style={{ color: 'red', width: '300px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
                            }}>
                            Shop Register
                        </Button>
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
                            }}>
                            Edit Profile
                        </Button>
                    </div>
                </Col>

                <Col md={7} style={{ backgroundColor: '#f8f9fa', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '10px', height:'auto'}}>
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
                                <td style={{ textAlign: 'end' }}><a href="/">Đổi mật khẩu</a></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid black', height: '50px' }}>
                                <td></td>
                                <td style={{ fontSize: '25px' }}><b>Phương thức liên lạc</b></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td style={{ fontWeight: 'bold', textAlign: 'end', width: '10vw' }}>Địa chỉ nhận hàng</td>
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
                    >
                        Bạn đang gặp vấn đề? Liên hệ với chúng tôi ngay!
                    </Button>
                    {isMyProfile ? (
                    <Button style={{ position: 'absolute', marginTop: '7vh', marginLeft: '10vw', width: '40vw', height: '50px', backgroundColor: 'white', borderColor: 'red', color: `red` }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = `red`;
                            e.target.style.color = 'white'
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = `red`
                        }}
                        onClick={handleDelete}
                    >
                        TÔI MUỐN XOÁ TÀI KHOẢN CỦA MÌNH
                    </Button>
                    ) : null}
                </Col>
            </Row>
        </Container>
        ) : null 
    );
}

export default Profile;