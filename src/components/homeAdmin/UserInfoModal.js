import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
function UserIModal(props) {
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Thông tin người dùng
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col style={{textAlign:'center'}}>
                            <Image src={props.user.UserPFP} thumbnail roundedCircle ></Image>
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            ID người dùng:
                        </Col>
                        <Col >
                            {props.user.UserID}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Tên tài khoản:
                        </Col>
                        <Col >
                            {props.user.UserAccountName}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Tên đầy đủ:
                        </Col>
                        <Col >
                            {props.user.UserFirstName} {props.user.UserFirstName}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Mật khẩu:
                        </Col>
                        <Col >
                            {props.user.UserPassword}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Email:
                        </Col>
                        <Col >
                            {props.user.UserEmail}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Địa chỉ:
                        </Col>
                        <Col >
                            {props.user.UserAddress}
                        </Col>
                    </Row>
                    <Row>
                        <Col >
                            Số điện thoại:
                        </Col>
                        <Col >
                            {props.user.UserPhone}
                        </Col>
                    </Row>

                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Đóng</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UserIModal;