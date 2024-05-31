import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddBannerModal(props) {
  const [adminID, setAdminID] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [bannerPic, setBannerPic] = useState('')



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/banner/add', {
        adminID,
        categoryID,
        bannerPic,
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Form>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default AddBannerModal;