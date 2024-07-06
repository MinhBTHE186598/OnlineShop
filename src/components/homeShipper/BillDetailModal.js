import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

function BillDetailModal({ show, onHide, billDetails, userId }) {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title >Bill Details</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
        <h4 style={{textAlign:'center'}}><strong>UserID của người đặt hàng:</strong> {userId}</h4>  
        {billDetails.map((billDetail, index) => (
          <div key={index}>
            <p><strong>Product ID:</strong> {billDetail.ProductID}</p>
            <p><strong>Số lượng:</strong> {billDetail.BillQuantity}</p>
            <p><strong>Ngày đặt hàng:</strong> {billDetail.BillDetailDate}</p>
            <hr />s
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
  billDetails: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.number.isRequired  
};

export default BillDetailModal;
