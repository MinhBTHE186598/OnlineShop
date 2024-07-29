import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function ChangeInfoModal({ show, onHide, user }) {
    const [Password] = useState(user.UserPassword);
    const [Address, setAddress] = useState(user.UserAddress);
    const [Email, setEmail] = useState(user.UserEmail);
    const [Phone, setPhone] = useState(user.UserPhone);
    const [FirstName] = useState(user.UserFirstName);
    const [LastName] = useState(user.UserLastName);
    const [PFP] = useState(user.UserPFP);
    const userID = user.UserID;


    const handleSubmit = async (e) => {
        try {
            const response = await axios.put('http://localhost:5000/user/update', {
                Password,
                Address,
                Email,
                Phone,
                FirstName,
                LastName,
                PFP,
                userID
            });
            if (response.status === 200) {
                alert('Thay đổi thành công');
                onHide();
                window.location.reload();
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Thông Tin Nhận Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group style={{ marginBottom: '10px' }}>
                            <Form.Label style={{ marginBottom: '0' }}>Tên người nhận</Form.Label>
                            <Form.Control type="text" value={user.UserLastName + ' ' + user.UserFirstName} disabled />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: '10px' }}>
                            <Form.Label style={{ marginBottom: '0' }}>Địa chỉ</Form.Label>
                            <Form.Control required type="text" defaultValue={user.UserAddress} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: '10px' }}>
                            <Form.Label style={{ marginBottom: '0' }}>Số điện thoại</Form.Label>
                            <Form.Control required type="text" defaultValue={user.UserPhone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                        <Form.Group style={{ marginBottom: '10px' }}>
                            <Form.Label style={{ marginBottom: '0' }}>Email liên hệ</Form.Label>
                            <Form.Control required type="text" defaultValue={user.UserEmail} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleSubmit() }}>
                        Lưu thay đổi
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ChangeInfoModal