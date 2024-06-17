import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
export default function ProductManager() {
    const [products, setProducts] = useState([{}])
    useEffect(() => {
        fetch("http://localhost:5000/product/getWhitelistProduct")
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>ProductDescription</th>
                    <th>SellerID</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr>
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
                                <Dropdown.Item eventKey="1">Chấp nhận</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Từ chối</Dropdown.Item>
                                
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}