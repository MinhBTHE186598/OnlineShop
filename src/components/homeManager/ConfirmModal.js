import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function ConfirmModal({ show, onHide, onConfirm, obj }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Xác nhận từ chối</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Từ chối đăng bán sản phẩm {obj}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Huỷ
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Xác nhận từ chối
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    obj: PropTypes.string.isRequired
};

export default ConfirmModal;
