import { Table, Image } from "react-bootstrap"
import MoneyForm from "../common/MoneyForm"
import { useState, useEffect } from "react"
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

export default function CateTable({ id, categories }) {
    const [products, setProducts] = useState([{}])
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [cateID, setCateID] = useState(1);

    const handleCheckboxChange = (productID) => {
        setSelectedProducts(prevState =>
            prevState.includes(productID)
                ? prevState.filter(id => id !== productID)
                : [...prevState, productID]
        );
    };

    useEffect(() => {
        fetch("http://localhost:5000/product/getProductByCate/" + id).then(
            response => response.json()
        ).then(
            data => {
                setProducts(data)
            }
        )
    }, [id])

    const changeCategory = (selectedProducts) => {
        const newCategoryID = cateID;
        fetch('http://localhost:5000/category/change', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productIDs: selectedProducts,
                newCategoryID: newCategoryID
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Refresh product list or show a success message
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        setSelectedProducts([])
    }

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sản phẩm</th>
                        <th>Trạng thái</th>
                        <th>Giá</th>
                        <th>Chọn</th>
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
                                    id={`inline-checkbox-${product.ProductID}`}
                                    value={product.ProductID}
                                    onChange={() => handleCheckboxChange(product.ProductID)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedProducts.length > 0 && (
                <div>
                    Chọn danh mục:
                    <Form.Select style={{ width: '20%' }} onChange={(e) => setCateID(e.target.value)}>
                        {categories.map(cate => (
                            <option value={cate.CategoryID}>{cate.CategoryName}</option>
                        ))}
                    </Form.Select>
                    <Button onClick={() => changeCategory(selectedProducts)} style={{ marginTop: '10px' }}>Đổi danh mục</Button>
                </div>
            )}

        </div>
    )
}