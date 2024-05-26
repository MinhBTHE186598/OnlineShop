import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../utility/testlogo.png';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


const CardStyle = {
    width: '12vw',
    backgroundColor: 'white',
    color: 'black',
    border: 'solid black 1px',
    borderRadius: '0px'
}

const MakeCenter = {
    marginTop: '20px',
    display: 'block',
    margin: 'auto'
}

const StarStyle = {
    display: 'flex',
    margin: "5px 0",
    fontSize: 'large',
    color: 'orange'
}
function ProductCardSmall() {
    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={logo} style={{borderBottom:'solid 1px black', borderRadius:'0px'}} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center'}}>Sản phẩm A</Card.Title>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                </div>
                <h5 style={{ color: 'orange' }}>100.000đ</h5>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCardSmall