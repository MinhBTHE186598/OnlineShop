import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function BillDetailModal({ show, onHide, billDetails }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Bill Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        {billDetails.map((billDetail, index) => (
          <div key={index}>
            <p><strong>Product ID:</strong> {billDetail.ProductID}</p>
            <p><strong>Quantity:</strong> {billDetail.ProductQuantity}</p>
            <p><strong>Date:</strong> {billDetail.BillDetailDate}</p>
            <hr />
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

BillDetailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  billDetails: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BillDetailModal;
