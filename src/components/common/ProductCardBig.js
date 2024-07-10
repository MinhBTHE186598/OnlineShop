import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { useUser } from "../context/UserContext";
import axios from "axios";
import ConfirmModal from './ConfirmModal'; 
const reformat = new Intl.NumberFormat('en-US', {
    
})
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
    const [sellers, setSellers] = useState([]);
    const [stars, setStars] = useState([]);
    const [categories, setCategories] = useState([]);
    const { user, isLogin, userCart } = useUser();
    const [cartList, setCartList] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const isInCart = () => {
        if (cartList.length > 0) {
            return cartList.find(item => item.ProductID === props.id);
        }
        return false;
    }

    const isSeller = () => {
        if (isLogin) {
            return sellers.some(item => item.SellerID === props.seller && item.UserID === user.UserID);
        }        
        return false;
    }
    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
    
    const addToCart = async () => {   
        const currentDate = formatDate(new Date());  
        try {
            await axios.post('http://localhost:5000/bill/addToCart', {
                BillID: userCart.BillID,
                ProductID: props.id,
                BillDetailDate: currentDate,
                BillDetailQuantity: 1,
                ShipperID: null
            });
            setCartList([...cartList, { ProductID: props.id }]);
            alert('Đã thêm sản phẩm vào giỏ hàng.');
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            alert('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
        }
    };

    const handleAddToCart = () => {
        if (!isLogin) {
            alert('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        } else {
            setShowModal(true);
        }    
    };

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
        if (isLogin && userCart) {
            function fetchCart() {
                axios
                    .get(`http://localhost:5000/bill/getBillDetailByBillID/${userCart.BillID}`)
                    .then((response) => {
                        setCartList(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            fetchCart();
        }
    }, [isLogin, userCart]);


    return (
        <Card style={CardStyle}>
            <Card.Img variant="top" src={props.pic} style={{ borderBottom: 'solid 2px black'}} />
            <Card.Body>
                <Card.Title style={{ textAlign: 'center', fontSize: 'x-large' }}><a href={`/product/${props.star}`} style={{ textDecoration: 'none', color: '#0d6efd' }}>{props.name}</a></Card.Title>
                <div>
                    <p style={Clamp}>{props.description}</p>
                    <p style={{...Clamp, marginBottom: '20px'}}>Người bán: {sellers.map(seller => {
                        if (seller.SellerID === props.seller) {
                            return <a href={`/shop/${seller.SellerID}`} style={{ textDecoration: 'none'}} key={seller.SellerID}>{seller.SellerName}</a>
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
                    <h4 style={{ color: 'orange' }}>{reformat.format(props.price)}đ</h4>
                </div>
                {isInCart() ? (<Button variant="secondary" disabled style={MakeCenter}>Đã có trong giỏ hàng</Button>
                ) : (
                    isSeller() ? (
                        <Button variant="secondary" disabled style={MakeCenter}>Bạn đang bán sản phẩm này</Button>
                    ) : (<Button variant="primary" style={MakeCenter} onClick={() => handleAddToCart()}>Thêm vào giỏ hàng</Button>))}
            </Card.Body>
            <ConfirmModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onConfirm={addToCart}
                productName={props.name}
            />
        </Card>
    )


}
ProductCardBig.defaultProps = {
    star: 0
}
export default ProductCardBig