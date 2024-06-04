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

function Profile() {
    const borderColor = '#0d6efd';

    return (
        <Container fluid style={{ backgroundImage: `url(${bgi})`, height: '100vh', backgroundSize: 'cover' }}>
            <Row>
                <Col md={3} style={{ backgroundColor: '#f8f9fa', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '8%' }}>
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
                        <Image src={logo} roundedCircle fluid />
                    </div>
                    <div style={{ marginTop: '20px', textAlign: 'center', width: '100%' }}>
                        <h3>John D. Doe</h3>
                    </div>
                    <div>
                        <p style={{ marginBottom: '0px' }}>User</p>
                    </div>
                    <div>
                        <p>ID: 12345</p>
                    </div>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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

                <Col md={7} style={{ backgroundColor: '#f8f9fa', height: '100vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '10px' }}>
                    <div style={{ marginTop: '15vh', marginLeft: '5vh' }}>
                        <h1>My Profile</h1>
                        <p>Update your profile for improved security</p>
                    </div>
                    <hr style={{color:'red'}}/>
                    <Col style={{ marginLeft: '10vw', marginTop: '5vh' }}>
                        <Row>
                            <h5>Username</h5>
                        </Row>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;