import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AddCateModal({ show, onHide, handleChange, categories }) {
    const [cate, setCate] = useState('')
    const [edit, setEdit] = useState(false)


    const handleAdd = async () => {
        try {
            const res = await axios.post('http://localhost:5000/category/addCate', {
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
                        {categories.map((category) => (
                            <tr>
                                <td>{category.CategoryID}</td>
                                <td>{category.CategoryName}</td>
                                <td>
                                    <Button style={{ marginRight: '10px' }}>
                                        Rename
                                    </Button>
                                    <Button variant="danger" disabled={category.counts !== 0}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control type='text' onChange={(e) => setCate(e.target.value)} />
                    {edit === true ? (
                        <Button variant='primary' style={{ marginTop: '10px' }}>
                            Confrim
                        </Button>
                    ) : (
                        <Button variant='primary' type="submit" style={{ marginTop: '10px' }}>
                            Add
                        </Button>
                    )}
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