import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditBannerModal(props) {
  const [adminID, setAdminID] = useState(props.Banner.AdminID)
  const [categoryID, setCategoryID] = useState(props.Banner.CategoryID)
  const [bannerPic, setBannerPic] = useState(props.Banner.BannerPic)
  const [bannerID] = useState(props.Banner.BannerID)

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
      const response = await axios.put('http://localhost:5000/banner/edit/' + props.Banner.BannerID, {
        adminID,
        bannerPic,
        categoryID,
      });
      if (response.status === 201) {
        console.log('Banner edited successfully');
      } else {
        console.error('Failed to edit Banner');
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
          <Form.Label>Danh mục Banner</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setCategoryID(e.target.value)} defaultValue={props.Banner.CategoryID}>
            <option >{props.Banner.CategoryName}</option>
            {categories.map((category) => (
              <option value={category.CategoryID} onClick={() => setCategoryID(category.CategoryID)}>{category.CategoryName}</option>
            ))}
          </Form.Select>
          <Form.Label>Baner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} defaultValue={props.Banner.BannerPic} />
          <Form.Label>Admin</Form.Label>
          <Form.Control type="text" value={props.Banner.UserAccountName} disabled readOnly on />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }} onClick={() => setAdminID(2)}>
            Save change
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