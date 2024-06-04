import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function EditBannerModal({show,onHide,Banner,onUpdateBanner}) {
  const [adminID, setAdminID] = useState('2')
  const [categoryID, setCategoryID] = useState(Banner.CategoryID)
  const [bannerPic, setBannerPic] = useState(Banner.BannerPic)
  const [bannerID] = useState(Banner.BannerID)

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
      const response = await axios.put('http://localhost:5000/banner/edit/' + Banner.BannerID, {
        adminID,
        bannerPic,
        categoryID,
      });
      if (response.status === 201) {
        onUpdateBanner({...adminID,bannerPic,categoryID})
        onHide()
        console.log('Banner edited successfully');
      } else {
        console.error('Failed to edit Banner');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={handleSubmit}>
          <Form.Label>Danh mục Banner</Form.Label>
          <Form.Select aria-label="Default select example" onChange={(e) => setCategoryID(e.target.value)} defaultValue={Banner.CategoryID}>
            <option hidden>{Banner.CategoryName}</option>
            {categories.map((category) => (
              <option value={category.CategoryID}>{category.CategoryName}</option>
            ))}
          </Form.Select>
          <Form.Label>Baner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} defaultValue={Banner.BannerPic} />
          <Form.Label>Admin</Form.Label>
          <Form.Control type="text" value={Banner.UserAccountName} disabled readOnly />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }} onClick={onHide}>
            Save change
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

export default EditBannerModal;