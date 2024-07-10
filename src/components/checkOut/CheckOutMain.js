import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const reformat = new Intl.NumberFormat('en-US', {

})

function CheckOutMain() {
    const navigate = useNavigate();
    const { userCart, isLogin, user } = useUser();
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product/get');
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
        function fetchCartEffect() {
            axios
                .get(`http://localhost:5000/bill/getBillDetailByBillID/${userCart.BillID}`)
                .then((response) => {
                    setCartList(response.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        fetchCartEffect();
        fetchProduct();
    }, [isLogin, navigate, userCart]);

    return (
        <div style={{ width: '100vw', marginTop: '10vh', padding: '5vh 0', backgroundColor: '#0d6efd' }}>
            <div style={{ width: '90%', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', padding: '20px' }}>
                <h1 style={{ textAlign: 'center' }}>Thanh toán</h1>
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
                                    <th>Ngày thêm</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th style={{ width: '10%' }}>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((cart) => (
                                    productList.map((product) => (
                                        cart.ProductID === product.ProductID && (
                                            <tr key={cart.ProductID} style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: 'x-large' }}>
                                                <td style={{ width: '150px', padding: '0' }}><img src={product.ProductPic} alt={product.ProductName} style={{ width: '100%' }} /></td>
                                                <td>{product.ProductName}</td>
                                                <td>{cart.BillDetailDate}</td>
                                                <td>
                                                    {cart.BillQuantity}
                                                </td>
                                                <td>{reformat.format(product.ProductPrice)}đ</td>
                                                <td>{reformat.format(cart.BillQuantity * product.ProductPrice)}đ</td>
                                            </tr>
                                        )
                                    ))
                                ))}
                            </tbody>
                        </Table>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: '20px auto', fontSize: '20px' }}>
                            <div>
                                <h3 style={{ color: '#0d6efd' }}>Thông tin giao hàng</h3>
                                <p>Tên: {user.UserFirstName + ' ' + user.UserLastName}</p>
                                <p>Địa chi: {user.UserAddress}</p>
                                <p>SĐT: {user.UserPhone}</p>
                                <p>Email: {user.UserEmail}</p>
                            </div>
                            <div>
                                <h3 style={{ color: '#0d6efd' }}>Thông tin thanh toán</h3>
                                <p>Vui lòng chọn phương thức thanh toán:</p>
                                <Form.Group>
                                    <Form.Check
                                        type="radio"
                                        id="creditCard"
                                        name='paymentMethod'
                                        label="Thanh toán bằng thẻ tín dụng"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="cashOnDelivery"
                                        name='paymentMethod'
                                        label="Thanh toán khi nhận hàng"
                                        required
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="bankTransfer"
                                        name='paymentMethod'
                                        label="Chuyển khoản ngân hàng"
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <div>
                                <h3 style={{ color: '#0d6efd' }}>Hóa đơn:</h3>
                                <p>Tổng giá trị giỏ hàng: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0))}đ</p>
                                <p>Phí giao hàng: 20,000đ</p>
                                <h4>
                                    Tổng thanh toán: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0) + 20000)}đ
                                </h4>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '20px', marginRight: '20px' }}>
                                    <Button size='lg' variant='primary' onClick={() => navigate('/mainShop')}>Tiếp tục mua hàng</Button>
                                    <Button size='lg' variant='success'>Xác nhận thanh toán</Button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckOutMain