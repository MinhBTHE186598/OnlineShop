import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddBannerModal({ show, onHide, onAdd,bannerID }) {
  const [adminID, setAdminID] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [bannerPic, setBannerPic] = useState('')

  const [categories, setCategory] = useState([{}])
  useEffect(() => {
    fetch("http://localhost:5000/category/getCategories").then(
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
      let banner = {
        AdminID: adminID,
        CategoryID: categoryID,
        BannerID: bannerID+1,
        BannerPic: bannerPic,
        UserAccountName: "N/A",
        UserFirstName: "N/A",
        UserLastName: "N/A",
        CategoryName: (categories.find((cate) => cate.CategoryID === (categoryID)))
      }
      console.dir(banner)
      onAdd(banner)
      if (response.status === 200) {
        console.log('Banner added successfully');
      } else {
        console.error('Failed to add banner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add banner</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Select aria-label="Default select example" onChange={(e) => setCategoryID(e.target.value)}>
            {categories.map((category) => (
              <option value={category.CategoryID}>{category.CategoryName}</option>
            ))}
          </Form.Select>
          <Form.Label>Baner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} required />
          <Form.Label>Admin</Form.Label>
          <Form.Control type="text" value={'2'} disabled readOnly on />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }} onClick={() => setAdminID(2)}>
            Add Banner
          </Button>
        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

  );
}

export default AddBannerModal;