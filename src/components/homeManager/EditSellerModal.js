import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EditSellerModal({ show, onHide, Seller = {}, onUpdate }) {
  EditSellerModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    Seller: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  const [sellerManagerID, setSellerManagerID] = useState(Seller.SellerManagerID || '');
  const [sellerID, setSellerID] = useState(Seller.SellerID || '');
  const [sellerName, setSellerName] = useState(Seller.SellerName || '');
  const [sellerAddress, setSellerAddress] = useState(Seller.SellerAddress || '');
  const [userID, setUserID] = useState(Seller.UserID || '');

  useEffect(() => {
    if (Seller) {
      setSellerManagerID(Seller.SellerManagerID || '');
      setSellerID(Seller.SellerID || '');
      setSellerName(Seller.SellerName || '');
      setSellerAddress(Seller.SellerAddress || '');
      setUserID(Seller.UserID || '');
    }
  }, [Seller]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/seller/updateSeller/${sellerID}`, {
        SellerID: sellerID,
        SellerName: sellerName,
        SellerAddress: sellerAddress,
      });

      if (response.status === 200) {
        onUpdate({ SellerID: sellerID, SellerName: sellerName, SellerAddress: sellerAddress, UserID: userID, SellerManagerID: sellerManagerID });
        console.log('Seller edited successfully');
        onHide(); // Close the modal on successful update
      } else {
        console.log('Error editing seller');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Seller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>SellerName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter SellerName"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
          />
          <Form.Label>SellerAddress</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter SellerAddress"
            value={sellerAddress}
            onChange={(e) => setSellerAddress(e.target.value)}
          />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }}>
            Save changes
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

export default EditSellerModal;
