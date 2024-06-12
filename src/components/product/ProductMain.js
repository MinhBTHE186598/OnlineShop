import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import ProductReview from './ProductReview';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import Button from 'react-bootstrap';

const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: 'max-content',
    width: '90vw',
    margin: '10vh auto',
    padding: '20px',
    overflow: 'auto'
}

const StarStyle = {
    display: 'flex',
    margin: "5px 0",
    fontSize: 'larger',
    color: 'orange'
}

function ProductMain(props) {
    const [productList, setProductList] = useState([]);
    const [stars, setStars] = useState([])
    const [sellerList, setSellerList] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseCategory = await fetch("http://localhost:5000/category/getCategories");
                const dataCategory = await responseCategory.json();
                setCategories(dataCategory);

                const responseSeller = await fetch("http://localhost:5000/seller/get");
                const dataSeller = await responseSeller.json();
                setSellerList(dataSeller);

                const responseReview = await fetch("http://localhost:5000/productReview/getStar");
                const dataReview = await responseReview.json();
                setStars(dataReview);

                const responseProduct = await fetch("http://localhost:5000/product/get");
                const dataProduct = await responseProduct.json();
                setProductList(dataProduct);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const product = productList.find(product => product.ProductID.toString() === props.id);
    return (
        product ? (
            <Container fluid style={containerStyle}>
                <Row>
                    <Col md={5} style={{ textAlign: 'center' }}>
                        <Carousel data-bs-theme="dark">
                            <Carousel.Item>
                                <img src={product.ProductPic} alt={product.ProductID} style={{ width: '100%', height: '100%' }} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={product.ProductPic} alt={product.ProductID} style={{ width: '100%', height: '100%' }} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={product.ProductPic} alt={product.ProductID} style={{ width: '100%', height: '100%' }} />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src={product.ProductPic} alt={product.ProductID} style={{ width: '100%', height: '100%' }} />
                            </Carousel.Item>
                        </Carousel>
                    </Col>
                    <Col>
                        <h1>{product.ProductName}</h1>
                        <p>{product.ProductDescription}</p>
                        <p>Danh mục: {categories.find(category => category.CategoryID === product.CategoryID).CategoryName}</p>
                        <a href={`/profile/${sellerList.find(seller => seller.SellerID === product.SellerID).UserID}`}>Người bán: {sellerList.find(seller => seller.SellerID === product.SellerID).SellerName}</a>
                        <p>Số lượng đăng bán: {product.ProductQuantity}</p>
                        <p style={{ color: product.ProductQuantity === 0 ? 'red' : 'green' }}>Tình trạng: {product.ProductQuantity === 0 ? 'Hết hàng' : 'Còn hàng'}</p>
                        <div style={StarStyle}>
                            {Array(stars.find(star => star.ProductID === product.ProductID)?.ProductStar || 0).fill(<FaStar />)}
                            {Array(5 - (stars.find(star => star.ProductID === product.ProductID)?.ProductStar || 0)).fill(<FaRegStar />)}
                        </div>
                        <p>{product.ProductPrice}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ProductReview id={product.ProductID} />
                    </Col>
                </Row>
            </Container>
        ) : null
    );
}

export default ProductMain

