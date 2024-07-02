import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CartMain() {
    const navigate = useNavigate();
    const { userCart, isLogin, user } = useUser();
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/product/get`);
            setProductList(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if (!isLogin) {
            alert('Bạn cần đăng nhập để thực hiện chức năng này!');
            navigate('/login');
        }
        function fetchCart() {
            axios.get(`http://localhost:5000/bill/getBillDetailByBillID/${userCart.BillID}`)
                .then(response => {
                    setCartList(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        fetchCart();
        fetchProduct();
    }, [isLogin, navigate, userCart]); 

    return (
        <div style={{ width: '100vw', marginTop: '10vh' }}>
            <h1>Giỏ hàng của {user.UserFirstName} {user.UserLastName}</h1>
            {cartList.map((cart) => (
                productList.map((product) => (
                    cart.ProductID === product.ProductID && (
                        <div key={product.ProductID}>
                            <p>{product.ProductName}</p>
                            <p>{product.ProductPrice}</p>
                            <p>{cart.BillDetailDate}</p>
                            <p>{cart.BillQuantity}</p>
                        </div>
                    )
                ))
            ))}
        </div>
    )
}

export default CartMain