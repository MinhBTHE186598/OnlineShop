import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import CheckOutModal from './CheckOutModal';
import ChangeInfoModal from './ChangeInfoModal';

const reformat = new Intl.NumberFormat('en-US', {

})

function CheckOutMain() {
    const navigate = useNavigate();
    const { userCart, setUserCart, isLogin, user } = useUser();
    const [userList, setUserList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showChangeInfoModal, setShowChangeInfoModal] = useState(false);

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getCart = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/bill/getCart/${id}`);
            const data = await response.json();
            if (data.length === 0) {
                await axios.post(`http://localhost:5000/bill/addNewBill/${id}`);
                getCart(id);
            }
            setUserCart(data[0]);
        }
        catch (error) {
            console.error(error);
        }
    };

    const handleCheckOut = async () => {
        const currentDate = formatDate(new Date());
        try {
            await axios.put(`http://localhost:5000/bill/checkOut/${userCart.BillID}`, {
                date: currentDate,
            })
            alert('Thanh toán thành công!');
            getCart(user.UserID);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    }

    const fetchProduct = async () => {
        try {
            const response = await axios.get('http://localhost:5000/product/get');
            setProductList(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchUser = async () => {
        try {
            const response = await axios.get('http://localhost:5000/user/get');
            setUserList(response.data);
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
        fetchUser();
    }, [isLogin, navigate, userCart]);

    const profile = userList.find((item) => item.UserID === user.UserID);

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
                            {profile && (
                                <div>
                                    <h3 style={{ color: '#0d6efd' }}>Thông tin giao hàng</h3>
                                    <p>Tên người nhận: {profile.UserLastName + ' ' + profile.UserFirstName}</p>
                                    <p>Địa chi: {profile.UserAddress}</p>
                                    <p>Số điện thoại: {profile.UserPhone}</p>
                                    <p>Email: {profile.UserEmail}</p>
                                    <Button variant="danger" onClick={() => setShowChangeInfoModal(true)}>Thay đổi</Button>
                                    <ChangeInfoModal show={showChangeInfoModal} onHide={() => setShowChangeInfoModal(false)} user={profile} />
                                </div>
                            )}

                            <div>
                                <h3 style={{ color: '#0d6efd' }}>Thông tin thanh toán</h3>
                                <p>Vui lòng chọn phương thức thanh toán:</p>
                                <Form.Group>
                                    <Form.Check
                                        type="radio"
                                        id="cashOnDelivery"
                                        name='paymentMethod'
                                        label="Thanh toán khi nhận hàng"
                                        defaultChecked
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="creditCard"
                                        name='paymentMethod'
                                        label="Thanh toán bằng thẻ tín dụng"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="bankTransfer"
                                        name='paymentMethod'
                                        label="Chuyển khoản ngân hàng"
                                    />
                                </Form.Group>
                            </div>
                            <div>
                                <h3 style={{ color: '#0d6efd' }}>Hóa đơn:</h3>
                                <p>Tổng giá trị giỏ hàng: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0))}đ</p>
                                <p>Phí giao hàng: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0) * 0.1)}đ</p>
                                <h4>
                                    Tổng thanh toán: {reformat.format(cartList.reduce((sum, cart) => sum + (productList.find(product => product.ProductID === cart.ProductID)?.ProductPrice || 0) * cart.BillQuantity, 0) * 1.1)}đ
                                </h4>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px', gap: '20px', marginRight: '20px' }}>
                                    <Button size='lg' variant='primary' onClick={() => navigate('/mainShop')}>Tiếp tục mua hàng</Button>
                                    <Button size='lg' variant='success' onClick={() => setShowModal(true)}>Xác nhận thanh toán</Button>
                                </div>
                                <CheckOutModal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    onConfirm={handleCheckOut}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckOutMain