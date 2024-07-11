import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Collapse, Form } from "react-bootstrap";
import { useState,useEffect } from 'react';
import axios from 'axios';

function ConfirmModalWithNoti({ show, onHide, onConfirm, userID, sellerName,productName }) {
    const [open, setOpen] = useState(false)
    const [NotiHeader, setTitle] = useState('Sản phẩm của bạn đã bị xóa')
    const [visible, setVisible] = useState(true)
    const [NotiBody, setBody] = useState('Sản phẩm mang ID: '+productName+ ' của bạn đã bị xóa')

    useEffect(() => {
        setBody('Sản phẩm tên: '+productName+ ' của bạn đã bị xóa');

    }, [productName]);

    const cf = () => {
        onConfirm()
        setVisible(false)
        setOpen(true)
    }

    const hide = () => {
        onHide()
        setOpen(false)
        setVisible(true)
    }

    const addnoti = async (e) => {
        try {
            const UserID = userID;
            const response = await axios.post('http://localhost:5000/noti/postnoti', {
                UserID,
                NotiHeader,
                NotiBody
            });
            if (response.status === 200) {
                console.log('Noti added successfully');
            } else {
                console.error('Failed to add noti');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleAddNoti = () => {
        try {
            addnoti()
            onHide()
            setOpen(false)
            setVisible(true)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (

        <Modal show={show} onHide={hide} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Waring</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this product
            </Modal.Body>
            <Modal.Footer>
            {visible && (
                <><Button variant="primary" onClick={cf}>
                Confirm
            </Button>
            <Button variant="secondary" onClick={hide}>
                Close
            </Button></>
            )}
                
            </Modal.Footer>
            <Collapse in={open}>
                <div style={{ margin: '15px' }}>
                    <h5>Do you want to send a notification to seller {sellerName}?</h5>
                    <Form>
                        <Form.Group>
                            <Form.Label>Notification Title</Form.Label>
                            <Form.Control defaultValue={'Sản phẩm của bạn đã bị xóa'} type="text" min={0} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Notification Body</Form.Label>
                            <Form.Control defaultValue={'Sản phẩm tên: '+productName+ ' của bạn đã bị xóa'} style={{ marginBottom: '5px' }} as="textarea" rows={3} onChange={(e) => setBody(e.target.value)} />
                        </Form.Group>
                        <Button style={{ marginRight: '5px' }} variant="primary" onClick={() => handleAddNoti()}>
                            Confirm
                        </Button>
                        <Button variant="secondary" onClick={hide}>
                            Close
                        </Button>
                    </Form>
                </div>
            </Collapse>
        </Modal>
    );
}

export default ConfirmModalWithNoti;