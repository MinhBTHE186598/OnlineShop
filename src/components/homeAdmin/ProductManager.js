import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState, useEffect } from 'react';
export default function ProductManager() {
    const [products, setProducts] = useState([{}])
    useEffect(() => {
        fetch("http://localhost:5000/product/getAll")
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
                    <th>Sold</th>
                    <th>Saler</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr>
                        <td>{product.ProductName}</td>
                        <td>{product.Sold}</td>
                        <td>{product.SellerName}</td>
                        <td>{product.CategoryName}</td>
                        <td>{product.ProductQuantity}</td>
                        <td>{product.ProductPrice}</td>
                        <td>
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Action"
                            >
                                <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}