import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from 'react';


const CardStyle = {
    width: '20vw',
    backgroundColor: 'white',
    color: 'black',
    border: 'solid 2px black'
}

const MakeCenter = {
    margin: '20px auto',
    display: 'block'
}

const StarStyle = {
    display: 'flex',
    margin: "10px 0",
    fontSize: 'x-large',
    color: 'orange'
}

const Clamp = {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    WebkitLineClamp: '1',
    WebkitBoxOrient: 'vertical',
    margin: '0'
}

function ProductCardBig(props) {
    const [sellers, setSellers] = useState([])
    const [stars, setStars] = useState([])
    const [categories, setCategories] = useState([])


    useEffect(() => {
        Promise.all([
            fetch("http://localhost:5000/category/getCategories"),
            fetch("http://localhost:5000/seller/get"),
            fetch(`http://localhost:5000/productReview/getStar/`)
        ]).then(async ([responseCategory, responseSeller, responseReview]) => {
            const dataCategory = await responseCategory.json();
            setCategories(dataCategory);

            const dataSeller = await responseSeller.json();
            setSellers(dataSeller);

            const dataReview = await responseReview.json();
            setStars(dataReview);
        }).catch(error => {
            console.error(error);
        });
    }, [])


    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={props.pic} style={{ borderBottom: 'solid 2px black'}} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'x-large' }}><a href={`/product/${props.star}`} style={{ textDecoration: 'none', color: '#0d6efd' }}>{props.name}</a></Card.Title>
                <div>
                    <p style={Clamp}>{props.description}</p>
                    <p style={{...Clamp, marginBottom: '20px'}}>Người bán: {sellers.map(seller => {
                        if (seller.SellerID === props.seller) {
                            return <a href={`/profile/${seller.UserID}`} style={{ textDecoration: 'none'}} key={seller.SellerID}>{seller.SellerName}</a>
                        }
                        return null
                    })}</p>
                    
                    <p style={Clamp}>Danh mục: {categories.find(category => category.CategoryID === props.category)?.CategoryName}</p>
                    <p style={Clamp}>Số luợng: {props.quantity}</p>
                    <p style={{color: props.quantity === 0? 'red' : 'green'}}>Tình trạng: {props.quantity === 0? 'Đã hết hàng' : 'Còn hàng'}</p>
                    <div style={StarStyle}>
                        {Array(stars.find(star => star.ProductID === props.star)?.ProductStar || 0).fill(<FaStar />)}
                        {Array(5 - (stars.find(star => star.ProductID === props.star)?.ProductStar || 0)).fill(<FaRegStar />)}
                    </div>
                    <h4 style={{ color: 'orange' }}>{props.price}đ</h4>
                </div>
                <Button variant="primary" style={MakeCenter}><a href='/' style={{ textDecoration: 'none', color: 'white' }}>Thêm vào giỏ hàng</a></Button>
            </Card.Body>
        </Card>
    )


}
ProductCardBig.defaultProps = {
    star: 0
}
export default ProductCardBig