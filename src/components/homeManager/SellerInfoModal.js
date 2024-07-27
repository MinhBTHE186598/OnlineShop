import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function SellerInfoModal({ show, onHide, seller }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Thông tin người bán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>ID người bán:</strong> {seller.SellerID}</p>
                <p><strong>Tên người bán:</strong> {seller.SellerName}</p>
                <p><strong>Địa chỉ người bán:</strong> {seller.SellerAddress}</p>
                <p><strong>ID tài khoản người dùng:</strong> {seller.UserID}</p>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

SellerInfoModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    seller: PropTypes.object.isRequired
};

export default SellerInfoModal;
