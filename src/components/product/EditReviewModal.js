import React, { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const StarStyle = {
    display: 'flex',
    margin: "0 0 10px 0",
    fontSize: 'x-large',
    color: 'orange'
}

function EditReviewModal({ show, onHide, Review, onUpdate }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const [newProductReviewText, setNewProductReviewText] = useState(Review.ProductReviewText);
    const [newProductReviewStar, setNewProductReviewStar] = useState(Review.ProductReviewStar);
    const [newProductReviewDate] = useState(day + "/" + month + "/" + year);

    useEffect(() => {
        setNewProductReviewText(Review.ProductReviewText);
        setNewProductReviewStar(Review.ProductReviewStar);
    }, [Review.ProductReviewText, Review.ProductReviewStar]);

    let newReview = {
        ProductReviewID: Review.ProductReviewID,
        ProductID: Review.ProductID,
        UserID: Review.UserID,
        ProductReviewStar: newProductReviewStar,
        ProductReviewDate: newProductReviewDate,
        ProductReviewText: newProductReviewText
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newProductReviewText.trim() === '') {
            alert('Nội dung đánh giá không thể để trống!');
            return;
        };
        try {
            const response = await axios.put(`http://localhost:5000/productReview/update/${Review.ProductReviewID}`, {
                ProductReviewStar: newProductReviewStar,
                ProductReviewDate: newProductReviewDate,
                ProductReviewText: newProductReviewText
            });
            if (response.status === 200) {
                console.log('Product Review updated successfully');
                onUpdate(newReview);
                onHide();
            } else {
                console.error('Failed to update Product Review');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa đánh giá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Sửa lại đánh giá sao: </Form.Label>
                    <div style={StarStyle}>
                        {Array.from({ length: newProductReviewStar }, (_, i) => <FaStar key={i} />)}
                        {Array.from({ length: 5 - newProductReviewStar }, (_, i) => <FaRegStar key={i} />)}
                    </div>
                    <Form.Control as="select" value={newProductReviewStar} onChange={(e) => setNewProductReviewStar(e.target.value)}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Form.Control>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Sửa lại nội dung đánh giá: </Form.Label>
                        <Form.Control as="textarea" rows={3} value={newProductReviewText} onChange={(e) => setNewProductReviewText(e.target.value)} required />
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="primary" type="submit" style={{ margin: '10px auto' }} onClick={onHide}>
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={onHide}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditReviewModal