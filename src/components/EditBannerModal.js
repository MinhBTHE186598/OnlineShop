import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

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


  //   const editBanner = async (id) => {
  //     try {
  //         const response = await axios.post(`http://localhost:5000/banner/edit/${id}`);
  //         if (response.status === 200) {
  //             console.log('Banner edited successfully');
  //             // Handle success (e.g., update the UI)
  //             setBannerList(bannerList);
  //         } else {
  //             console.error('Failed to edit banner');
  //             // Handle failure
  //         }
  //         setBannerList(bannerList);
  //     } catch (error) {
  //         console.error('Error:', error);
  //     }
  // }

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

        <Form onSubmit={handleSubmit}>
          <Form.Label>Danh mục Banner</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setCategoryID(e.target.value)} defaultValue={props.Banner.CategoryID}>
            <option hidden>{props.Banner.CategoryName}</option>
            {categories.map((category) => (
              <option value={category.CategoryID} onClick={() => setCategoryID(category.CategoryID)}>{category.CategoryName}</option>
            ))}
          </Form.Select>
          <Form.Label>Baner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} value={props.Banner.BannerPic} />
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