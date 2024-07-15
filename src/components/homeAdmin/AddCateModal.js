import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCateModal({ show, onHide, handleChange, categories }) {
    const [cate, setCate] = useState('')


    const handleAdd = async () => {
        try {
            const res = await axios.put('http://localhost:5000/category/addCate', {
                cate
            });
            if (res.status === 200) {
                console.log('Responsed successfully');
            } else {
                console.error('Failed to response');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd()
        onHide()
        handleChange()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category)=>(
                            <tr>
                                <td>{category.CategoryID}</td>
                                <td>{category.CategoryName}</td>
                                <td>:D</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control type='text' onChange={(e)=>setCate(e.target.value)} />
                    <Button variant='primary' type="submit" >
                        Confirm
                    </Button>
                </Form>
                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}