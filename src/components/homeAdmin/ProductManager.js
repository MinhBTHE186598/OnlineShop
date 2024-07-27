import Table from 'react-bootstrap/Table';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import { useState, useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaMagnifyingGlass } from "react-icons/fa6";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FilterCollapse from './FilterCollapse';
import axios from 'axios';
import MoneyForm from "../common/MoneyForm";
import EditPModal from './EditPModal';
import ConfirmModalWithNoti from './ConfirmModalWithNoti';

export default function ProductManager() {
    const [products, setProducts] = useState([{}])
    const [search, setSearch] = useState('')
    const [open, setOpen] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [showCf, setShowCf] = useState(false)
    const [productinf, setProductinf] = useState({})
    const [userID, setUserID] = useState(0)
    const [sellerName, setSellerName] = useState('')
    const [productID, setProductID] = useState(1)
    const [productName,setProductName] = useState('')

    const [filter, setFilter] = useState({
        category: '%',
        order: 'ProductID asc',
        price: [0, 100000000],
        seller: '%',
        status: '%'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFilter(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleUpdate = (updateProduct) => {
        setProducts(products.map((product)=> product.ProductID===updateProduct.ProductID?updateProduct:product))
        setShowEdit(false);
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch("http://localhost:5000/product/getAllFilter", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(filter)
                });
                const data = await response.json();
                setProducts(data);
                console.log(filter);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [filter]);

    const deleteProduct = async (id) => {
        try {

            const response = await axios.delete(`http://localhost:5000/product/delete/${id}`);
            setProducts(products.map(product =>
                product.ProductID === id ? { ...product, ProductStatus: "Đã xóa" } : product
            )
            );
            if (response.status === 200) {
                console.log('product deleted successfully');
                // Handle success (e.g., update the UI)
            } else {
                console.error('Failed to delete product');
                // Handle failure
            }


        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDelete = (Uid, name, Pid, status,pname) => {
        if (status === 'Đã xoá') {
            alert('You cant delete deleted product')
        } else {
            setUserID(Uid)
            setSellerName(name)
            setProductID(Pid)
            setProductName(pname)
            setShowCf(true)
        }
    }

    const handleEdit = (producti) => {
        try {
            setProductinf(producti)
            setShowEdit(true)
        } catch (error) {
            console.error('Error:', error);
        }
    }


    return (
        <div>
            <Row>
                <Col>
                    <InputGroup >
                        <Form.Control
                            placeholder="Search by product name"
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="primary" id="button-addon2">
                            <FaMagnifyingGlass />
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        Lọc
                    </Button>
                </Col>
                <FilterCollapse open={open} handleInputChange={handleInputChange} />
            </Row>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sản phẩm</th>
                        <th>Đã bán</th>
                        <th>Người bán</th>
                        <th>Danh mục</th>
                        <th>Còn</th>
                        <th>Trạng thái</th>
                        <th>Giá</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.filter((product) => {
                        return search.toLowerCase() === '' ? product : product.ProductName.toLowerCase().includes(search);
                    }).map((product) => (
                        <tr>
                            <td>{product.ProductID}</td>
                            <td><Image src={product.ProductPic} rounded style={{ width: "33px" }} />{product.ProductName}</td>
                            <td>{product.Sold !== null ? (product.Sold) : (0)}</td>
                            <td>{product.SellerName}</td>
                            <td>{product.CategoryName}</td>
                            <td>{product.ProductQuantity}</td>
                            <td style={{ color: product.ProductStatus === 'Đã xác thực' ? 'green' : 'red' }}>{product.ProductStatus}</td>
                            <td><MoneyForm value={product.ProductPrice} /></td>
                            <td>
                                <DropdownButton
                                    size="sm"
                                    variant="secondary"
                                    title="Hành động"
                                >
                                    <Dropdown.Item eventKey="1" href={`/product/${product.ProductID}`}>Điều hướng</Dropdown.Item>
                                    <Dropdown.Item eventKey="2" onClick={() => handleDelete(product.UserID, product.SellerName, product.ProductID, product.ProductStatus,product.ProductName)}>Xóa</Dropdown.Item>
                                    <Dropdown.Item eventKey="3" onClick={() => handleEdit(product)}>Chỉnh sửa</Dropdown.Item>
                                </DropdownButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <EditPModal show={showEdit} onHide={() => setShowEdit(false)} product={productinf} 
                handleUpdate={handleUpdate}/>
            <ConfirmModalWithNoti show={showCf} onHide={() => setShowCf(false)} onConfirm={() => deleteProduct(productID)} userID={userID}
                sellerName={sellerName} productid={productID} productName={productName}
            />
        </div>
    )
}