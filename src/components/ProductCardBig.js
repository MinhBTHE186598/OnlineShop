import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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

function ProductCardBig(props) {
    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={props.pic} />
            <hr />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'x-large' }}>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <a href='#home'>Tên người bán</a>
                <div style={StarStyle}>
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                </div>
                <h3 style={{ color: 'orange' }}>{props.price}đ</h3>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCardBig