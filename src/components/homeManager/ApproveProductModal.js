import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function ApproveProductModal({ show, onHide, Product = {}, onUpdate }) {
  ApproveProductModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    Product: PropTypes.object,
    onUpdate: PropTypes.func,
  };

  const [productID, setProductID] = useState(Product.ProductID || '');
  const [productName, setProductName] = useState(Product.ProductName || '');
  const [productDescription, setProductDescription] = useState(Product.ProductDescription || '');
  const [productQuantity, setProductQuantity] = useState(Product.ProductQuantity || '');
  const [productPrice, setProductPrice] = useState(Product.ProductPrice || '');
  const [productStatus, setProductStatus] = useState(Product.ProductStatus || '');

  useEffect(() => {
    if (Product) {
      setProductID(Product.ProductID || '');
      setProductName(Product.ProductName || '');
      setProductDescription(Product.ProductDescription || '');
      setProductQuantity(Product.ProductQuantity || '');
      setProductPrice(Product.ProductPrice || '');
      setProductStatus(Product.ProductStatus || '');
    }
  }, [Product]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/product/approve/${productID}`, {
        ProductID: productID,
        ProductStatus: "Approved",
      });

      if (response.status === 200) {
        onUpdate({
          ProductID: productID,
          ProductName: productName,
          ProductDescription: productDescription,
          ProductQuantity: productQuantity,
          ProductPrice: productPrice,
          ProductStatus: "Approved"
        });
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
        <Modal.Title>Chấp thuận sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Tên sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Điền tên sản phẩm"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            disabled
          />
          <Form.Label>Mô tả sản phẩm</Form.Label>
          <Form.Control
            type="text"
            placeholder="Điền mô tả sản phẩm"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            disabled
          />
          <Form.Label>Số lượng sản phẩm</Form.Label>
          <Form.Control
            type="number"
            placeholder="Điền số lượng sản phẩm"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            disabled
          />
          <Form.Label>Giá</Form.Label>
          <Form.Control
            type="number"
            placeholder="Điền giá sản phẩm"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            disabled
          />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }}>
            Approve
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

export default ApproveProductModal;
