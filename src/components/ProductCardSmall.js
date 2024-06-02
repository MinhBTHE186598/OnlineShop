import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from 'react';


const CardStyle = {
    width: '12vw',
    height: '50vh',
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
function ProductCardSmall(props) {
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

    const [stars, setStars] = useState([])
    useEffect(() => {
        fetch(`/productReview/getStar/`).then(
            response => response.json()
        ).then(
            data => {
                setStars(data)
            }
        )
    }, [])

    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={props.pic} style={{ borderBottom: 'solid 1px black', borderRadius: '0px' }} />
            <Card.Body style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Card.Title style={{ textAlign: 'center' }}>{props.name}</Card.Title>
                <div>
                    {sellers.map(seller => {
                        if (seller.SellerID === props.seller) {
                            return <a href='/home' key={seller.SellerID}>{seller.SellerName}</a>
                        }
                        return null
                    })}
                    <div style={StarStyle}>
                        {Array(stars.find(star => star.ProductID === props.star)?.ProductStar || 0).fill(<FaStar />)}
                        {Array(5 - (stars.find(star => star.ProductID === props.star)?.ProductStar || 0)).fill(<FaRegStar />)}
                    </div>
                    <h5 style={{ color: 'orange' }}>{props.price}đ</h5>
                </div>
                <Button variant="primary" style={MakeCenter}>Thêm vào giỏ hàng</Button>
            </Card.Body>
        </Card>
    )
}

ProductCardSmall.defaultProps = {
    star: 0
}
export default ProductCardSmall