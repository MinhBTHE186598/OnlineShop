import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import { useUser } from '../context/UserContext';

const StarStyle = {
  display: 'flex',
  margin: "5px 0",
  fontSize: 'x-large',
  color: 'orange'
}

function SellerProfile(props) {
  const { id } = props;
  const [seller, setSeller] = useState(null);
  const [user, setUser] = useState(null);
  const [sellerStars, setSellerStars] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellerResponse, userResponse, reviewResponse] = await Promise.all([
          axios.get(`http://localhost:5000/seller/get`),
          axios.get(`http://localhost:5000/user/get`),
          axios.get(`http://localhost:5000/sellerReview/getStar`),
        ]);

        const filteredSeller = sellerResponse.data.find(
          (seller) => seller.SellerID.toString() === id
        );
        const filteredUser = userResponse.data.find(
          (user) => user.UserID === filteredSeller?.UserID
        );

        setSeller(filteredSeller);
        setUser(filteredUser);

        const filteredStars = reviewResponse.data.find((star) => star.SellerID.toString() === id);
        setSellerStars(filteredStars.SellerStar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  if (!seller) {
    return <div>Seller not found</div>;
  }

  return (
    <Row style={{ display: 'flex', backgroundColor: 'white', width: '90%', height: 'max-content', minHeight: '20vh', margin: '0 auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '5vh 0' }}>
      <Col md={3}>
        <div style={{
          width: '250px',
          height: '250px',
          borderRadius: '10%',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          border: `3px solid pink`,
          margin: '10px auto',
          boxShadow: '0 6px 6px rgba(0, 0, 0, 0.1)',
          position: 'relative',
        }}>
          <img src={user?.UserPFP} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </Col>
      <Col md={8} style={{ margin: '10px' }}>
        <h2 style={{ textAlign: 'center' }}><b>Thông Tin Cửa Hàng</b></h2>
        <hr style={{ color: 'red' }} />
        <h4>Tên Cửa Hàng: {seller.SellerName}</h4>
        <h4>Địa Chỉ: {seller.SellerAddress}</h4>
        <h4>Đánh giá: <div style={StarStyle}>{Array.from({ length: 5 }, (_, index) => index < sellerStars ? <FaStar /> : <FaRegStar />)}</div></h4>
        <hr style={{ color: 'red' }} />
      </Col>
    </Row>
  );
}

export default SellerProfile