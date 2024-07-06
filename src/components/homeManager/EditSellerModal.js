import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import axios from 'axios';

function EditSellerModal({ show, onHide, Seller, onUpdate }) {
    const [sellerName, setSellerName] = useState('');
    const [sellerAddress, setSellerAddress] = useState('');

    useEffect(() => {
        if (Seller) {
            setSellerName(Seller.SellerName);
            setSellerAddress(Seller.SellerAddress);
        }
    }, [Seller]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/seller/updateSeller/${Seller.SellerID}`, {
                SellerName: sellerName,
                SellerAddress: sellerAddress
            });

            if (response.status === 200) {
                onUpdate({
                    ...Seller,
                    SellerName: sellerName,
                    SellerAddress: sellerAddress
                });
            } else {
                console.error('Failed to update seller');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Seller</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSellerName">
                        <Form.Label>Seller Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={sellerName}
                            onChange={(e) => setSellerName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSellerAddress">
                        <Form.Label>Seller Address</Form.Label>
                        <Form.Control
                            type="text"
                            value={sellerAddress}
                            onChange={(e) => setSellerAddress(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

EditSellerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    Seller: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default EditSellerModal;
