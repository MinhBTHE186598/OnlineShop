import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
// import { useUser } from '../context/UserContext';
import axios from 'axios';

const StarStyle = {
  display: 'flex',
  margin: "0 0 10px 0",
  fontSize: 'x-large',
  color: 'orange',
  justifyContent: 'center'
}

const AvgStarStyle = {
    display: 'flex',
    margin: "0 0 10px 0",
    fontSize: '60px',
    color: 'orange',
    justifyContent: 'center'
  }

const imageStyle = {
  width: '100%',
  margin: '10px 0 10px 10px',
  backgroundColor: '#fff',
  borderRadius: '50%',
  border: '2px solid #000'
}
function SellerReview(props) {
    const { id } = props;
  const [sellerReview, setSellerReview] = useState([]);
  const [userList, setUserList] = useState([]);
  const [sellerStars, setSellerStars] = useState();

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
      fetch("http://localhost:5000/user/get").then(response => response.json()),
    ]).then(([userData]) => {
      setUserList(userData);
    });
    fetchReview();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewResponse] = await Promise.all([
          
          axios.get(`http://localhost:5000/sellerReview/getStar`),
        ]);
        const filteredStars = reviewResponse.data.find((star) => star.SellerID === id);
        setSellerStars(filteredStars.SellerStar);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const items = sellerReview.filter((item) => item.SellerID === Number(props.id));


  return (
    <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', padding: '5vh 0', borderTop: '1px solid black' }}>
      <div style={{ width: '100%', margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Đánh giá trung bình</h1>
        <h4><div style={AvgStarStyle}>{Array.from({ length: 5 }, (_, index) => index < sellerStars ? <FaStar /> : <FaRegStar />)}</div></h4>
        <hr/>
        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Người dùng nói gì về cửa hàng này?</h3>
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
                </div>
                <hr />
                <p style={{ borderRadius: '20px', height: '50%' }}>{item.SellerReviewText}</p>
              </Col>
            </Row>
          );
        }) : <p>Not found</p>}
      </div>
    </div>
  )
}

export default SellerReview