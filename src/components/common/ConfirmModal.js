import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmModal({ show, onHide, onConfirm, productName }) {
    const handleConfirm = () => {
        onConfirm();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to add {productName} to the cart?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;
