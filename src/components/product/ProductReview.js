import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useUser } from '../context/UserContext';

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
function ProductReview(props) {
    const [productReview, setProductReview] = useState([]);
    const [userList, setUserList] = useState([]);
    const { user } = useUser();

    useEffect(() => {
        fetch("http://localhost:5000/productReview/get").then(
            response => response.json()
        ).then(
            data => {
                setProductReview(data)
            }
        )
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/user/get").then(
            response => response.json()
        ).then(
            data => {
                setUserList(data)
            }
        )
    }, [])

    const item = productReview.filter((item) => item.ProductID === props.id)

    return (
        item ? item.map((item) => {
            const currentUser = userList.find((currentUser) => currentUser.UserID === item.UserID);
            return (
                <div className="product-review" style={{ width: '100%', marginBottom: '20px', padding: ' 0 10px 10px 0', borderRadius: '30px', border: '2px solid #000' }} key={item.ProductReviewID}>
                    <Row>
                        <Col md={2}>
                            <img src={currentUser?.UserPFP || null} alt="UserPFP" style={imageStyle} />
                        </Col>
                        <Col md={10} style={{ padding: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <a href={`/profile/${currentUser?.UserID}`} style={{ margin: '0px', textDecoration: 'none', fontSize: 'larger' }}>{`${currentUser?.UserFirstName} ${currentUser?.UserLastName}`}</a>
                                    <p style={{ margin: '0px' }}>{item.ProductReviewDate}</p>
                                    <div style={StarStyle}>
                                        {[...Array(5)].map((star, index) => {
                                            const ratingValue = index + 1;
                                            return (
                                                ratingValue <= item.ProductReviewStar ? (<FaStar key={index} />) : (<FaRegStar key={index} />)
                                            );
                                        })}
                                    </div>
                                </div>
                                {user && user.UserID === item.UserID ? (
                                    <div>
                                        <Button variant="primary" style={{ marginRight: '10px' }}>Edit</Button>
                                        <Button variant="danger">Delete</Button>
                                    </div>
                                ) : null}
                            </div>
                            <hr />
                            <p style={{ borderRadius: '20px', height: '50%' }}>{item.ProductReviewText}</p>
                        </Col>
                    </Row>
                </div>
            );
        }) : <p>Not found</p>
    )
}

export default ProductReview