import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import logo from '../utility/testlogo.png';
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";


const CardStyle = {
    width: '20vw',
    backgroundColor: 'white',
    color: 'black',
    border: 'solid 2px black'
}

const MakeCenter = {
    marginTop: '10px',
    display: 'block',
    margin: 'auto'
}

const StarStyle = {
    display: 'flex',
    margin: "10px 0",
    fontSize: 'x-large',
    color: 'orange'
}

function ProductCardBig() {
    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={logo} />
            <hr />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'xx-large' }}>Sản phẩm A</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>100.000đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCardBig