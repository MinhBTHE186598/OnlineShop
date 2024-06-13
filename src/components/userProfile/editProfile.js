import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";
import axios from 'axios';


function EditProfileModal({ show, onHide }) {
    const { user, setUser, setUserRole, setIsLogin } = useUser();
    const [Password, setPassword] = useState(user.UserPassword);
    const [Address, setAddress] = useState(user.UserAddress);
    const [Email, setEmail] = useState(user.UserEmail);
    const [Phone, setPhone] = useState(user.UserPhone);
    const [FirstName, setFirstName] = useState(user.UserFirstName);
    const [LastName, setLastName] = useState(user.UserLastName);
    const [PFP, setPFP] = useState(user.UserPFP);
    

    const userID = user.UserID;

    const handleSubmit = async (e) => {
        // e.preventDefault();
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
                console.log('updated');
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Hồ Sơ Cá Nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <Form.Control type="text" value={user.UserAccountName} disabled readOnly />
                        <Form.Group>
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserPassword} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ảnh đại diện</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserPFP} onChange={(e) => setPFP(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tên</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserFirstName} onChange={(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Họ</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserLastName} onChange={(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserAddress} onChange={(e) => setAddress(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email liên hệ</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserEmail} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control type="text" defaultValue={user.UserPhone} onChange={(e) => setPhone(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleSubmit(); window.location.reload()}}>
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

export default EditProfileModal;