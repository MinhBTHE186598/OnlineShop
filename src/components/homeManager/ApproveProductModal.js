import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ApproveProductModal({ show, onHide, Product = {}, onUpdate }) {
  // Correct way to declare PropTypes
  ApproveProductModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    Product: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  const [productID, setProductID] = useState(Product.ProductID || '');

  useEffect(() => {
    if (Product) {
      setProductID(Product.ProductID || '');
    }
  }, [Product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/product/approve', {
        ProductID: productID,
      });
      if (response.status === 200) {
        onUpdate({ ProductID: productID, ProductStatus: "Approved" });
        console.log('Product approved successfully');
        onHide(); // Close the modal on successful update
      } else {
        console.log('Error approving product');
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Approve Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Status</Form.Label>
          <Button variant="primary" type="submit">
            Approve
          </Button>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ApproveProductModal;
