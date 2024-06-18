import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useUser } from '../context/UserContext';
import { useState, useEffect } from "react";
import axios from 'axios';


function EditProductModal({ show, onHide, product }) {
    const { user, setUser, setUserRole, setIsLogin } = useUser();
    const [productName, setPName] = useState('');
    const [productCategory, setSelectedOption] = useState('');
    const [productPrice, setPPrice] = useState('')
    const [productPic, setPPic] = useState('')
    const [productQuantity, setPQuantity] = useState('')
    const [productDesc, setPDesc] = useState('')
    
    const [categoryList, setCategories] = useState([{}])

    const [sellerList, setSellerList] = useState([]);

    const userID = user.UserID;

    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await axios.put('http://localhost:5000/user/update', {
                sellerID,
                productName,
                productCategory,
                productPrice,
                productPic,
                productQuantity,
                productDesc
            });
            if (response.status === 200) {
                console.log('updated');
            } else {
                console.error('failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/category/getCategories").then(
          response => response.json()
        ).then(
          data => {
            setCategories(data)
          }
        )
      }, [])

    React.useEffect(() => {
        fetch("http://localhost:5000/seller/get")
            .then(response => response.json())
            .then(data => {
                setSellerList(data)
            })
    }, [])

    const getSellerID = () => {
        const seller = sellerList.find(seller => seller.UserID === user.UserID);
        if (seller) return seller.SellerID;
        else return null;
    }

    const sellerID = getSellerID();

    return (
        <div>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Hồ Sơ Cá Nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        
                        <Form.Label>ProductID</Form.Label>
                        <Form.Control type="text" value={product.ProductID} disabled readOnly />
                        <Form.Group>
                            <Form.Label>ProductName</Form.Label>
                            <Form.Control type="text" defaultValue={product.ProductName} onChange={(e) => setPName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label><b>Phân loại sản phẩm:</b></Form.Label><br />
                        
                        <Form.Control as="select" value={product.CategoryID} onChange={(e) => setSelectedOption(e.target.value)}>
                            {categoryList.map((category, index) => (
                                <option key={index} value={category.CategoryID}>{category.CategoryName}</option>
                            ))}
                        </Form.Control>
                        {console.log(product.CategoryID)}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Giá sản phẩm:</b></Form.Label>
                        <Form.Control type="number" min={0} defaultValue={product.ProductPrice} onChange={(e) => setPPrice(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Hình ảnh sản phẩm:</b></Form.Label><br />
                        <Form.Control type="text" defaultValue={product.ProductPic} onChange={(e) => setPPic(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Số lượng trong kho:</b></Form.Label>
                        <Form.Control type="number" min={0} defaultValue={product.ProductQuantity} onChange={(e) => setPQuantity(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>Mô tả sản phẩm:</b></Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue={product.ProductDescription} onChange={(e) => setPDesc(e.target.value)} required />
                    </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { handleSubmit(); window.location.reload()}}>
                        Lưu thay đổi
                    </Button>
                    <Button variant="secondary" onClick={onHide}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default EditProductModal;