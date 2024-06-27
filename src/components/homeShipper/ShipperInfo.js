import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function ShipperInfoModal({ show, onHide, shipper }) {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Shipper Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Seller ID:</strong> {shipper.ShipperID}</p>
                <p><strong>Seller Name:</strong> {shipper.name}</p>
                <p><strong>User ID:</strong> {shipper.UserID}</p>
                <p><strong>User First Name:</strong> {shipper.UserFirstName}</p>
                <p><strong>User Last Name:</strong> {shipper.UserLastName}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

ShipperInfoModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    shipper: PropTypes.shape({
        ShipperID: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        UserID: PropTypes.string.isRequired,
        UserFirstName: PropTypes.string.isRequired,
        UserLastName: PropTypes.string.isRequired,
    }).isRequired,
};

export default ShipperInfoModal;
