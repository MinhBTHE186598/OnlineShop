import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import { Button, Table } from 'react-bootstrap';
import { useState    } from 'react';
import axios from 'axios';

export default function AddCateModal({ show, onHide, handleChange, categories, handleDelete }) {
    const [cate, setCate] = useState('')
    const [edit, setEdit] = useState(false)
    const [id, setID] = useState(0)
    const [count, setCount] = useState(0)


    const handleAdd = async () => {
        try {
            if (cate === '') {
                alert('you should fill the field')
            } else {
                let newCate = {
                    CategoryID: categories.length + 2,
                    CategoryName: cate,
                    counts: 0
                }
                const res = await axios.post('http://localhost:5000/category/addCate', {
                    cate
                });
                handleChange(newCate, "add")
                if (res.status === 200) {
                    console.log('Responsed successfully');
                } else {
                    console.error('Failed to response');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const updateCate = async () => {
        try {
            let newCate = {
                CategoryID: id,
                CategoryName: cate,
                counts: count
            }
            const response = await axios.put('http://localhost:5000/category/update', {
                id: id,
                name: cate
            });
            handleChange(newCate, "edit")
            if (response.status === 200) {
                console.log('Category edited successfully');
            } else {
                console.error('Failed to edit category');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRename = (CategoryName,CategoryID,counts) => {
        setCount(counts)
        setID(CategoryID)
        setEdit(true)
        setCate(CategoryName)
    }

    const handleUpdate = () => {
        updateCate()
        setEdit(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd()
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Danh mục</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Tên danh mục</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category,id) => (
                            <tr>
                                <td>{id}</td>
                                <td>{category.CategoryName}</td>
                                <td>
                                    <Button style={{ marginRight: '10px' }} onClick={() => handleRename(category.CategoryName,category.CategoryID,category.counts)}>
                                        Đổi tên
                                    </Button>
                                    <Button variant="danger" disabled={category.counts !== 0} onClick={() => handleDelete(category.CategoryID)}>
                                        xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Form onSubmit={handleSubmit}>
                    <Form.Label>Tên danh mục:</Form.Label>
                    <Form.Control type='text' onChange={(e) => setCate(e.target.value)} defaultValue={cate} />
                    {edit === true ? (
                        <div>
                            <Button variant='primary' style={{ marginTop: '10px', marginRight: '10px' }} onClick={handleUpdate}>
                                Đổi tên
                            </Button>
                            <Button variant='secondary' style={{ marginTop: '10px' }} onClick={() => setEdit(false)}>
                                Hủy
                            </Button>
                        </div>
                    ) : (
                        <Button variant='primary' onClick={handleSubmit} style={{ marginTop: '10px' }}>
                            Thêm
                        </Button>
                    )}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Hủy
                </Button>
            </Modal.Footer>
        </Modal>
    )
}