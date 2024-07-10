import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CheckOutModal({ show, onHide, onConfirm}) {
    const handleConfirm = () => {
        onConfirm();
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận thêm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có xác nhận muốn thanh toán không?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleConfirm}>
                    Xác nhận
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Từ chối
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CheckOutModal;
