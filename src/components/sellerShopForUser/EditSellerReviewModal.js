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

function EditSellerReviewModal({ show, onHide, Review, onUpdate }) {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const [newSellerReviewText, setNewSellerReviewText] = useState(Review.SellerReviewText);
    const [newSellerReviewStar, setNewSellerReviewStar] = useState(Review.SellerReviewStar);
    const [newSellerReviewDate] = useState(day + "/" + month + "/" + year);

    useEffect(() => {
        setNewSellerReviewText(Review.SellerReviewText);
        setNewSellerReviewStar(Review.SellerReviewStar);
    }, [Review.SellerReviewText, Review.SellerReviewStar]);

    let newReview = {
        SellerReviewID: Review.SellerReviewID,
        SellerID: Review.SellerID,
        UserID: Review.UserID,
        SellerReviewStar: newSellerReviewStar,
        SellerReviewDate: newSellerReviewDate,
        SellerReviewText: newSellerReviewText
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newSellerReviewText.trim() === '') {
            alert('Nội dung đánh giá không thể để trống!');
            return;
        };
        try {
            const response = await axios.put(`http://localhost:5000/sellerReview/update/${Review.SellerReviewID}`, {
                SellerReviewStar: newSellerReviewStar,
                SellerReviewDate: newSellerReviewDate,
                SellerReviewText: newSellerReviewText
            });
            if (response.status === 200) {
                console.log('Seller Review updated successfully');
                onUpdate(newReview);
                onHide();
            } else {
                console.error('Failed to update Seller Review');
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
                        {Array.from({ length: newSellerReviewStar }, (_, i) => <FaStar key={i} />)}
                        {Array.from({ length: 5 - newSellerReviewStar }, (_, i) => <FaRegStar key={i} />)}
                    </div>
                    <Form.Control as="select" value={newSellerReviewStar} onChange={(e) => setNewSellerReviewStar(e.target.value)}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Form.Control>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Sửa lại nội dung đánh giá: </Form.Label>
                        <Form.Control as="textarea" rows={3} value={newSellerReviewText} onChange={(e) => setNewSellerReviewText(e.target.value)} required />
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

export default EditSellerReviewModal