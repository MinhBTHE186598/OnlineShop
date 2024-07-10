import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import EditSellerReviewModal from './EditSellerReviewModal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const StarStyle = {
  display: 'flex',
  margin: "0 0 10px 0",
  fontSize: 'x-large',
  color: 'orange'
}

const imageStyle = {
  width: '100%',
  margin: '10px 0 10px 10px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  border: '2px solid #000'
}
function SellerReview(props) {
  const [sellerReview, setSellerReview] = useState([]);
  const [userList, setUserList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const { user, isLogin } = useUser();
  const [editReview, setEditReview] = useState(false);
  const [reviewDetail, setReviewDetail] = useState({});

  const isSeller = () => {
    if (isLogin) {
      const seller = sellerList.find(seller => seller.SellerID === Number(props.id));
      return seller ? seller.UserID === user.UserID : false;
    }
    return false;
  }

  const closeEditReview = () => {
    setEditReview(false);
  }
  const showEditReview = () => {
    setEditReview(true);
  }

  const handleUpdate = (updatedReview) => {
    setSellerReview(sellerReview.map(review => review.SellerReviewID === updatedReview.SellerReviewID ? updatedReview : review));
    setEditReview(false);
  }

  const editReviewHandler = async (review) => {
    try {
      setReviewDetail(review);
      showEditReview();
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();



  const [review, setReview] = useState({
    SellerID: Number(props.id),
    UserID: user ? Number(user.UserID) : null,
    SellerReviewStar: 1,
    SellerReviewDate: day + "/" + month + "/" + year,
    SellerReviewText: '',
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/sellerReview/add', {
        SellerID: Number(review.SellerID),
        UserID: review.UserID,
        SellerReviewStar: review.SellerReviewStar,
        SellerReviewDate: review.SellerReviewDate,
        SellerReviewText: review.SellerReviewText,
      });
      if (response.status === 200) {
        console.log('Seller Review added successfully');
        fetchReview();
        setReview({
          SellerID: Number(props.id),
          UserID: user ? Number(user.UserID) : null,
          SellerReviewStar: 1,
          SellerReviewDate: day + "/" + month + "/" + year,
          SellerReviewText: '',
        });
      } else {
        console.error('Failed to add Seller Review');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const fetchReview = async () => {
    try {
      const responseReview = await fetch("http://localhost:5000/sellerReview/get");
      const dataReview = await responseReview.json();
      setSellerReview(dataReview);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/seller/get").then(response => response.json()),
      fetch("http://localhost:5000/user/get").then(response => response.json()),
    ]).then(([sellerData, userData]) => {
      setSellerList(sellerData);
      setUserList(userData);
    });
    fetchReview();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/sellerReview/delete/${id}`);
        if (response.status === 200) {
          console.log('Seller Review deleted successfully');
          fetchReview();
        } else {
          console.error('Failed to delete Seller Review');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }

  const items = sellerReview.filter((item) => item.SellerID === Number(props.id));


  return (
    <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', padding: '5vh 0', borderTop: '1px solid black' }}>
      <div style={{ width: '60%', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Đánh giá người bán</h3>
        {items ? items.map((item) => {
          const currentUser = userList.find((currentUser) => currentUser.UserID === item.UserID);
          return (
            <Row className="seller-review" style={{ width: '100%', marginBottom: '20px', padding: ' 0 10px 10px 0', borderRadius: '30px', border: '2px solid #000' }}>
              <Col md={2}>
                <img src={currentUser?.UserPFP || null} alt="UserPFP" style={imageStyle} />
              </Col>
              <Col md={10} style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <a href={`/profile/${currentUser?.UserID}`} style={{ margin: '0px', textDecoration: 'none', fontSize: 'larger' }}>{`${currentUser?.UserFirstName} ${currentUser?.UserLastName}`}</a>
                    <p style={{ margin: '0px' }}>{item.SellerReviewDate}</p>
                    <div style={StarStyle}>
                      {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          ratingValue <= item.SellerReviewStar ? (<FaStar key={index} />) : (<FaRegStar key={index} />)
                        );
                      })}
                    </div>
                  </div>
                  {user && user.UserID === item.UserID ? (
                    <div>
                      <Button variant="primary" style={{ marginRight: '10px' }} onClick={() => editReviewHandler(item)}>Chỉnh sửa</Button>
                      <Button variant="danger" onClick={() => handleDelete(item.SellerReviewID)}>Xóa</Button>
                    </div>
                  ) : null}
                </div>
                <hr />
                <p style={{ borderRadius: '20px', height: '50%' }}>{item.SellerReviewText}</p>
              </Col>
            </Row>
          );
        }) : <p>Not found</p>}
        {isLogin ?
          <Form onSubmit={handleSubmit} style={{ marginLeft: '-10px' }}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ fontSize: 'x-large' }}>Thêm đánh giá:</Form.Label>
              <Form.Control as="textarea" rows={3} value={review.SellerReviewText} disabled={isSeller()} onChange={(e) => setReview({ ...review, SellerReviewText: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
              <Form.Label style={{ fontSize: 'x-large', marginBottom: '0px' }}>Chọn đánh giá sao:</Form.Label>
              <div style={StarStyle}>
                {Array.from({ length: review.SellerReviewStar }, (_, i) => <FaStar key={i} />)}
                {Array.from({ length: 5 - review.SellerReviewStar }, (_, i) => <FaRegStar key={i} />)}
              </div>
              <Form.Control as="select" style={{ width: '6%' }} value={review.SellerReviewStar} disabled={isSeller()} onChange={(e) => setReview({ ...review, SellerReviewStar: Number(e.target.value) })}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {!isSeller() ? (
              <Button variant="success" type="submit" style={{ marginTop: '10px' }}>
                Thêm đánh giá
              </Button>
            ) : (<Button variant="secondary" type="submit" disabled style={{ marginTop: '10px' }}>
              Bạn không thể tự đánh giá shop của mình
            </Button>)}
          </Form> : null}
      </div>
      <EditSellerReviewModal show={editReview} onHide={closeEditReview} Review={reviewDetail} onUpdate={handleUpdate} />
    </div>
  )
}

export default SellerReview
