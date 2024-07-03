import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const reformat = new Intl.NumberFormat('en-US', {

})
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
        <div style={{ width: '100vw', marginTop: '10vh', padding: '5vh 0', backgroundColor: '#0d6efd'}}>
            <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Giỏ hàng của {user.UserFirstName} {user.UserLastName}</h1>
                {cartList.length === 0 ? (
                    <div style={{ height: '45vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '10px' }}>
                        <h3>Chưa có sản phẩm trong giỏ hàng</h3>
                        <Button variant="primary" onClick={() => navigate('/mainShop')}>Bắt đầu mua sắm</Button>
                    </div>
                ) : (
                    <div>
                        <Table striped bordered hover>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>Ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Thành tiền</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((cart, index) => (
                                    productList.map((product) => (
                                        cart.ProductID === product.ProductID && (
                                            <tr key={cart.ProductID} style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 'x-large' }}>
                                                <td style={{ width: '150px', padding: '0' }}><img src={product.ProductPic} alt={product.ProductName} style={{ width: '100%' }} /></td>
                                                <td>{product.ProductName}</td>
                                                <td>
                                                    <Button className="btn btn-danger">-</Button>
                                                    <input key={index} type="number" defaultValue={cart.BillQuantity} disabled required style={{ width: '50px', textAlign: 'center', margin: '0 10px' }} />
                                                    <Button className="btn btn-success">+</Button>
                                                </td>
                                                <td>{reformat.format(product.ProductPrice)}đ</td>
                                                <td>{reformat.format(cart.BillQuantity * product.ProductPrice)}đ</td>
                                                <td>
                                                    <Button size='lg' className="btn btn-warning" style={{ marginRight: '10px' }}>Sửa</Button>
                                                    <Button size='lg' className="btn btn-danger">Xóa</Button>
                                                </td>
                                            </tr>
                                        )
                                    ))
                                ))}
                            </tbody>
                        </Table>
                        <h3 style={{ textAlign: 'right', marginRight: '20px' }}>
                            Tổng thanh toán: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0))}đ
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '20px', marginRight: '20px' }}>
                            <Button size='lg' variant='primary' onClick={() => navigate('/mainShop')}>Tiếp tục mua hàng</Button>
                            <Button size='lg' variant='success'>Thanh toán</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartMain