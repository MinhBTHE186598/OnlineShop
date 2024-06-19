import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';
import EditProductModal from './EditProductModal';

export default function ProductManager(props) {
    const [products, setProducts] = useState([{}])
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);

    const [productInf, setProductInf] = useState({});


    const editProduct = async (product) => {
        try {
            setProductInf(product);
            setShowEdit(true);
        } catch (error) {
            console.error('Error:', error);
        }
    }



    useEffect(() => {
        fetch(`http://localhost:5000/product/getProductSID/${props.id}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <div>
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
                    <tr>
                        <td><Image src={product.ProductPic} rounded style={{width: "33px"}}/>{product.ProductName}</td>
                        <td>{product.Sold!==null?(product.Sold):(0)}</td>
                        <td>{product.ProductDescription}</td>
                        <td>{product.CategoryName}</td>
                        <td>{product.ProductQuantity}</td>
                        <td style={{ color: product.ProductStatus === 'Đã xác thực' ? 'green' : 'red' }}>{product.ProductStatus}</td>
                        <td>{product.ProductPrice}</td>
                        <td>
                            <DropdownButton
                                size="sm"
                                variant="secondary"
                                title="Action"
                            >
                                <Dropdown.Item eventKey="1" onClick={() => {editProduct(product)}}>Edit</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Delete</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                            </DropdownButton>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <EditProductModal show={showEdit} onHide={handleCloseEdit} product={productInf}/>
        </div>
    )
}