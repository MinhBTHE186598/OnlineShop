import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";
import axios from 'axios';


function EditProfileModal({ show, onHide, profile }) {
    const { user } = useUser();
    const [sellerId, setSellerId] = useState(profile.SellerID);
    const [sellerName, setSellerName] = useState(profile.SellerName);
    const [sellerAddress, setSellerAddress] = useState(profile.SellerAddress);

    // useEffect(() => {
    //     setSellerId(profile.SellerID);
    //     setSellerName(profile.SellerName);
    //     setSellerAddress(profile.SellerAddress);
    // }, [profile.SellerID, profile.SellerName, profile.SellerAddress]);

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/product/update', {
                sellerId,
                sellerName,
                sellerAddress,
                
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
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Hồ Sơ Cá Nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Label><b>ID Sản Phẩm:</b></Form.Label>
                        <Form.Control type="text" value={profile.SellerID} disabled readOnly />
                        <Form.Group>
                            <Form.Label><b>Tên sản phẩm:</b></Form.Label>
                            <Form.Control type="text" defaultValue={profile.SellerName} onChange={(e) => setSellerName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>Giá sản phẩm:</b></Form.Label>
                            <Form.Control type="text" min={0} defaultValue={profile.SellerAddress} onChange={(e) => setSellerAddress(e.target.value)} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleSubmit(); window.location.reload() }}>
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