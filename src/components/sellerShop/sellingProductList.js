import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';
import EditProductModal from './EditProductModal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function ProductManager(props) {
    const [products, setProducts] = useState([{}])
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);

    const [productInf, setProductInf] = useState({});
    const navigate = useNavigate();

    const editProduct = async (product) => {
        try {
            setProductInf(product);
            setShowEdit(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDeleteProduct = (product) => {
        if (window.confirm(`Bạn muốn xóa sản phẩm ${product.ProductName}?`)) {
            fetch(`http://localhost:5000/product/delete/${product.ProductID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({

                })
            })
            window.location.reload();
        }
    }

    useEffect(() => {
        fetch(`http://localhost:5000/product/getProductSID/${props.id}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, [props.id])

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "end", marginBottom: "10px" }}>
                <Button onClick={() => navigate('/addProduct')}>Thêm Sản Phẩm</Button>
            </div>
            <Table striped bordered hover>
                <thead >
                    <tr>
                        <th>Sản Phẩm</th>
                        <th>Đã Bán</th>
                        <th>Mô Tả Sản Phẩm</th>
                        <th>Phân Loại</th>
                        <th>Kho</th>
                        <th>Tình Trạng</th>
                        <th>Giá</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        product.ProductStatus === 'Đã xác thực' ? (
                        <tr>
                            <td><Image src={product.ProductPic} rounded style={{ width: "33px" }} />{product.ProductName}</td>
                            <td>{product.Sold !== null ? (product.Sold) : (0)}</td>
                            <td>{product.ProductDescription}</td>
                            <td>{product.CategoryName}</td>
                            <td>{product.ProductQuantity}</td>
                            <td style={{ color: product.ProductStatus === 'Đã xác thực' ? 'green' : 'red' }}>{product.ProductStatus}</td>
                            <td>{product.ProductPrice}</td>
                            <td>
                                <DropdownButton
                                    size="sm"
                                    variant="secondary"
                                    title="Chọn"
                                >
                                    <Dropdown.Item eventKey="1" onClick={() => { editProduct(product) }}>Sửa</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={() => { handleDeleteProduct(product) }}>Xoá</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item eventKey="4" onClick={() => { navigate(`/product/${product.ProductID}`) }}>Tới trang sản phẩm</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ) : null
                    ))}
                </tbody>
            </Table>
            <EditProductModal show={showEdit} onHide={handleCloseEdit} product={productInf} />
        </div>
    )
}