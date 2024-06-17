import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useUser } from '../context/UserContext';

function AddBannerModal({ show, onHide, onAdd,bannerID }) {
  const [adminID, setAdminID] = useState('')
  const [categoryID, setCategoryID] = useState('1')
  const [bannerPic, setBannerPic] = useState('')
  const { user} = useUser();
  const [categories, setCategory] = useState([{}])
  const [admins, setAdmins] = useState([{}]);

  

  useEffect(() => {
    fetch("http://localhost:5000/category/getCategories").then(
      response => response.json()
    ).then(
      data => {
        setCategory(data)
      }
    )
  }, [])
  
  function getCategory(id){
    let intID=+id;
    let cate = categories.find(cate=> cate.CategoryID === intID)
    return cate ? cate.CategoryName : 'Category not found'
  }
  useEffect(() => {
    fetch("http://localhost:5000/admin/get").then(
      response => response.json()
    ).then(
      data => {
        setAdmins(data)
      }
    )
  }, [])

  function getAdminID(id) {
    let intID = +id;
    let admin = admins.find(admin => admin.UserID === intID)
    return admin ? admin.AdminID : 'Admin not found'
  }

  const handleClick = () => {
    try{

      setAdminID(getAdminID(user.UserID));
      onHide();
    }catch(error){
      console.error('Error:', error);
    }
  }

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
        UserAccountName: user.UserAccountName,
        UserFirstName: user.UserFirstName,
        UserLastName: user.UserLastName,
        CategoryName: getCategory(categoryID)
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
          <Form.Label>Banner Image Url</Form.Label>
          <Form.Control type="text" onChange={(e) => setBannerPic(e.target.value)} required />
          <Form.Label>Admin</Form.Label>
          <Form.Control type="text" value={user.UserAccountName+" ("+user.UserFirstName+" "+user.UserLastName+")"} disabled readOnly on />
          <Button variant="primary" type="submit" style={{ marginTop: '30px' }} onClick={handleClick}>
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