import React from 'react';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
// import { useState } from 'react';
// import axios from 'axios';
import Image from 'react-bootstrap/Image';
import logo from '../../utility/testlogo.png';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../utility/register.css';

function Profile() {
    const borderColor = '#0d6efd';

    return (
        <Container fluid style={{ backgroundColor: '0d6efd' }}>
            <Row>
                <Col md={3} style={{ backgroundColor: 'white', display: 'flex', flexDirection: 'column', justifyContent: '', alignItems: 'center', height: '100vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '8%' }}>
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
                        <p>User</p>
                    </div>
                    <div>
                        <Button style={{
                            width: '200px',
                            height: '50px',
                            marginTop: '25vh',
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

                <Col md={7} style={{ backgroundColor: 'white', height: '100vh', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', marginLeft: '10px' }}>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile;