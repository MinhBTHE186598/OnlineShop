import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from 'axios';


function EditPModal({ show, onHide, product, handleUpdate }) {
    const [productName, setPName] = useState(product.ProductName);
    const [productCategory, setSelectedOption] = useState(product.categoryID);
    const [productPrice, setPPrice] = useState(product.ProductPrice);
    const [productPic, setPPic] = useState(product.ProductPic);
    const [productQuantity, setPQuantity] = useState(product.productQuantity);
    const [productDesc, setPDesc] = useState(product.ProductDescription);

    const [categoryList, setCategories] = useState([{}])

    useEffect(() => {
        fetch("http://localhost:5000/category/getCategories").then(
            response => response.json()
        ).then(
            data => {
                setCategories(data)
            }
        )
    }, [])

    function getCategory(id) {
        let intID = +id;
        let cate = categoryList.find(cate => cate.CategoryID === intID)
        return cate ? cate.CategoryName : 'Category not found'
      }

    useEffect(() => {
        setPName(product.ProductName);
        setSelectedOption(product.CategoryID);
        setPPrice(product.ProductPrice);
        setPPic(product.ProductPic);
        setPQuantity(product.ProductQuantity);
        setPDesc(product.ProductDescription);
    }, [product.ProductName, product.CategoryID, product.ProductPrice, product.ProductPic, product.ProductQuantity, product.ProductDescription]);

    

    const productID = product.ProductID;
    const handleSubmit = async () => {
        try {
            let producti = {
                Sold: product.Sold,
                CategoryName: getCategory(productCategory),
                ProductID: product.ProductID,
                ProductName: productName,
                ProductPic: productPic,
                ProductPrice: productPrice,
                ProductStatus: product.ProductStatus,
                ProductQuantity: productQuantity,
                SellerName: product.SellerName,
                UserID: product.UserID,
                ProductDescription: productDesc,
                CategoryID: productCategory
            }
            handleUpdate(producti)
            onHide()
            const response = await axios.put('http://localhost:5000/product/update', {
                productID,
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

    

    return (
        <div>
            <Modal show={show} onHide={onHide} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Thông Tin Sản Phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>

                        <Form.Label><b>ID Sản Phẩm:</b></Form.Label>
                        <Form.Control type="text" value={product.ProductID} disabled readOnly />
                        <Form.Group>
                            <Form.Label><b>Tên sản phẩm:</b></Form.Label>
                            <Form.Control type="text" defaultValue={product.ProductName} onChange={(e) => setPName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label><b>Phân loại sản phẩm:</b></Form.Label><br />

                            <Form.Control as="select" defaultValue={product.CategoryID} onChange={(e) => setSelectedOption(e.target.value)}>
                                {categoryList.map((category, index) => (
                                    <option key={index} value={category.CategoryID}>{category.CategoryName}</option>
                                ))}
                            </Form.Control>
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
                    <Button variant="primary" onClick={() => { handleSubmit() }}>
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

export default EditPModal;