import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ApproveProductModal from './ApproveProductModal';

export default function ProductManager() {
    const [products, setProducts] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/product/getWhitelistProduct")
            .then(response => response.json())
            .then(data => {
                setProducts(data);
            })
    }, []);

    const handleApprove = (approveProduct) => {
        setProducts(products.map(product =>
            product.ProductID === approveProduct.ProductID ? approveProduct : product
        ));
        setShowEdit(false);
    };

    const handleEditProduct = (product) => {
        setSelectedProduct(product);
        setShowEdit(true); // Set showEdit to true to show the modal
    };

    return (
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
                        <td>{product.ProductName}</td>
                        <td>{product.ProductDescription}</td>
                        <td>{product.UserID}</td>
                        <td>{product.ProductQuantity}</td>
                        <td>{product.ProductPrice}</td>
                        <td>{product.ProductStatus}</td>
                        <td>
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Action"
                            >
                                <Dropdown.Item eventKey="1" onClick={() => handleEditProduct(product)}>
                                    Chấp nhận
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="2">
                                    Từ chối
                                </Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
            {selectedProduct && (
                <ApproveProductModal
                    show={showEdit}
                    onHide={() => setShowEdit(false)}
                    Product={selectedProduct}
                    onUpdate={handleApprove}
                />
            )}
        </Table>
    );
}
