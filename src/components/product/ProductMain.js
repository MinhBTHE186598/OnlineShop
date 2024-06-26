import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import ProductReview from './ProductReview';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const reformat = new Intl.NumberFormat('en-US', {

})

const containerStyle = {
    backgroundColor: '#fff',
    borderRadius: '10px',
    height: 'max-content',
    width: '90vw',
    margin: '10vh auto',
    overflow: 'auto'
}

const StarStyle = {
    display: 'flex',
    margin: "5px 0",
    fontSize: 'x-large',
    color: 'orange'
}

const reviewStyle = {
    padding: '20px',
    margin: 'auto'
}

function ProductMain(props) {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [stars, setStars] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user, isLogin } = useUser();

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

    useEffect(() => {
        fetchData();
        if ((productList.length > 0 && (props.id > productList.length || props.id <= 0)) || isNaN(props.id)) {
            navigate('/notfound');
        }
    }, [productList, props.id, navigate]);

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
                    <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div>
                            <h1 style={{ marginBottom: '50px', color: '#0d6efd' }}>{product.ProductName}</h1>
                            <h3>Mô tả sản phẩm: </h3>
                            <h4 style={{ marginBottom: '30px', backgroundColor: '#ddd', padding: '15px', borderRadius: '20px', border: 'solid 1px black', width: '80%' }}>{product.ProductDescription}</h4>
                            <p style={{ marginBottom: '30px', fontSize: 'x-large' }}>Danh mục: {categories.find(category => category.CategoryID === product.CategoryID).CategoryName}</p>
                            <a href={`/profile/${sellerList.find(seller => seller.SellerID === product.SellerID).UserID}`} style={{ fontSize: 'x-large', textDecoration: 'none' }}>Người bán: {sellerList.find(seller => seller.SellerID === product.SellerID).SellerName}</a>
                            <p style={{ marginBottom: '0', fontSize: 'larger' }}>Số lượng đăng bán: {product.ProductQuantity}</p>
                            <p style={{ color: product.ProductQuantity === 0 ? 'red' : 'green', fontSize: 'larger', marginBottom: '30px' }}>Tình trạng: {product.ProductQuantity === 0 ? 'Hết hàng' : 'Còn hàng'}</p>
                            <div style={StarStyle}>
                                {Array(stars.find(star => star.ProductID === product.ProductID)?.ProductStar || 0).fill(<FaStar />)}
                                {Array(5 - (stars.find(star => star.ProductID === product.ProductID)?.ProductStar || 0)).fill(<FaRegStar />)}
                            </div>
                            <p style={{ fontSize: 'xx-large', color: 'orange', margin: '0' }}>{reformat.format(product.ProductPrice)}đ</p>
                            <Button variant="primary" size='lg'>
                                Thêm vào giỏ hảng
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row style={{ padding: '100px 0' }}>
                    <Col xs={8} style={reviewStyle}>
                        <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Đánh giá sản phẩm</h3>
                        <ProductReview id={product.ProductID} />
                    </Col>
                </Row>
            </Container >
        ) : null
    );
}

export default ProductMain


