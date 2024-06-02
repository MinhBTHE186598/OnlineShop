import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

function EditBannerModal(props) {
  const [adminID, setAdminID] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [bannerPic, setBannerPic] = useState('')

  const [categories, setCategory] = useState([{}])
  useEffect(() => {
    fetch("/category/getCategories").then(
      response => response.json()
    ).then(
      data => {
        setCategory(data)
      }
    )
  }, [])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/banner/add', {
        adminID,
        bannerPic,
        categoryID,
      });
      if (response.status === 201) {
        console.log('User added successfully');
      } else {
        console.error('Failed to add user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <Modal {...props}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Choose category
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item value={category.CategoryID} onClick={() => setCategoryID(category.CategoryID)}>{category.CategoryName}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Baner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} />
          <Form.Label>Admin</Form.Label>
          <Form.Control type="text" value={'2'} disabled readOnly on />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }} onClick={() => setAdminID(2)}>
            Add Banner
          </Button>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default EditBannerModal;