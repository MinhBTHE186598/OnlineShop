import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from 'react';


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
    const [sellers, setSellers] = useState([])

    useEffect(() => {
        fetch("/seller/get").then(
            response => response.json()
        ).then(
            data => {
                setSellers(data)
            }
        )
    }, [])


    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={props.pic} />
            <hr />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'x-large' }}>{props.name}</Card.Title>
                <Card.Text>
                    {props.description}
                </Card.Text>
                <a href='/home'>{sellers.map(seller => {
                    if (seller.SellerID === props.seller) {
                        return seller.SellerName
                    }
                    return null
                })}</a>
                <div style={StarStyle}>
                    <FaStar />
                </div>
                <h3 style={{ color: 'orange' }}>{props.price}đ</h3>
                <Button variant="primary" style={MakeCenter}><a href='/' style={{ textDecoration: 'none', color: 'white' }}>Thêm vào giỏ hàng</a></Button>
            </Card.Body>
        </Card>
    )
}

export default ProductCardBig