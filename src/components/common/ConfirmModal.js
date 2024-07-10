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
                <Modal.Title>Xác nhận thêm</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có muốn thêm sản phẩm này vào giỏ hàng?
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

export default ConfirmModal;
