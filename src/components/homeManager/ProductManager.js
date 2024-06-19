import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ApproveProductModal from './ApproveProductModal';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import ConfirmModal from './ConfirmModal'; // Import ConfirmModal

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productIDToDelete, setProductIDToDelete] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/product/getWhitelistProduct")
      .then(response => response.json())
      .then(data => {
        setProducts(data);
      });
  }, []);

  const handleApprove = (approvedProduct) => {
    setProducts(products.map(product =>
      product.ProductID === approvedProduct.ProductID ? approvedProduct : product
    ));
    setShowEdit(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEdit(true);
  };

  const handleDeleteProduct = async (productID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/product/delete/${productID}`);
      if (response.status === 200) {
        setProducts(products.filter(product => product.ProductID !== productID));
        console.log('Product deleted successfully');
      } else {
        console.log('Error deleting product');
      }
    } catch (error) {
      console.error('Error', error);
    }
    setShowConfirm(false);
  };

  const confirmDeleteProduct = (productID) => {
    setProductIDToDelete(productID);
    setShowConfirm(true);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Product Description</th>
            <th>Seller ID</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <Image src={product.ProductPic} rounded style={{ width: "33px" }} />
                {product.ProductName}
              </td>
              <td>{product.ProductDescription}</td>
              <td>{product.UserID}</td>
              <td>{product.ProductQuantity}</td>
              <td>{product.ProductPrice}</td>
              <td>{product.ProductStatus}</td>
              <td>
                <Button size="sm" variant="primary" onClick={() => handleEditProduct(product)}>
                  Approve
                </Button>
                <Button size="sm" variant="danger" onClick={() => confirmDeleteProduct(product.ProductID)}>
                  Refuse
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedProduct && (
        <ApproveProductModal
          show={showEdit}
          onHide={() => setShowEdit(false)}
          Product={selectedProduct}
          onUpdate={handleApprove}
        />
      )}
      <ConfirmModal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={() => handleDeleteProduct(productIDToDelete)}
        obj="product"
      />
    </>
  );
}
