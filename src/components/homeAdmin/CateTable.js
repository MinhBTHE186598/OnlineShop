import { Table, Image } from "react-bootstrap"
import MoneyForm from "../common/MoneyForm"
import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
export default function CateTable({ id }) {
    const [products, setProducts] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/product/getProductByCate/" + id).then(
            response => response.json()
        ).then(
            data => {
                setProducts(data)
            }
        )
    }, [id])

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Select</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                        <td>{product.ProductID}</td>
                        <td><Image src={product.ProductPic} rounded style={{ width: "33px" }} />{product.ProductName}</td>
                        <td style={{ color: product.ProductStatus === 'Đã xác thực' ? 'green' : 'red' }}>{product.ProductStatus}</td>
                        <td><MoneyForm value={product.ProductPrice} /></td>
                        <td>
                            <Form.Check
                                inline
                                type="checkbox"
                                id={`inline-checkbox-1`}
                                value={product.ProductID}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}