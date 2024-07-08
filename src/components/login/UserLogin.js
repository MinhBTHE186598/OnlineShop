// src/Login.js
import React, { useEffect, useState } from 'react';
import '../../utility/Login.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
  const [userList, setUserList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [sellManagerList, setSellManagerList] = useState([]);
  const [AdminList, setAdminList] = useState([]);
  const [ShipperList, setShipperList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login Page"
  }, [])
  const fetchData = async () => {
    try {
      const responseUser = await fetch("http://localhost:5000/user/get");
      const dataUser = await responseUser.json();
      setUserList(dataUser);

      const responseSeller = await fetch("http://localhost:5000/seller/get");
      const dataSeller = await responseSeller.json();
      setSellerList(dataSeller);

      const responseSellManager = await fetch("http://localhost:5000/sellManager/get");
      const dataSellManager = await responseSellManager.json();
      setSellManagerList(dataSellManager);

      const responseAdmin = await fetch("http://localhost:5000/admin/get");
      const dataAdmin = await responseAdmin.json();
      setAdminList(dataAdmin);
      const responseShipper = await fetch("http://localhost:5000/user/getShipper");
      const dataShipper = await responseShipper.json();
      setShipperList(dataShipper);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRole = (id) => {
    const seller = sellerList.find(seller => seller.UserID === id);
    const sellManager = sellManagerList.find(sellManager => sellManager.UserID === id);
    const admin = AdminList.find(admin => admin.UserID === id);
    const shipper = ShipperList.find(shipper => shipper.UserID === id);
    if (seller) return "Seller";
    else if (sellManager) return "SellManager";
    else if (admin) return "Admin";
    else if (shipper) return "Shipper";  
    else return "User";
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
  catch(error) {
    console.error(error);
  }
};
  

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setUserRole, setIsLogin, setUserCart } = useUser();
  const logIn = (event) => {
    event.preventDefault();
    let found = false;
    userList.map((user) => {
      if (username === user.UserAccountName && password === user.UserPassword) {
        found = true;
        setUser(user);
        setIsLogin(true);
        setUserRole(getRole(user.UserID));
        getCart(user.UserID);
      } 
    })
    if (!found) {
      setError("Sai tài khoản hoặc mật khẩu.");
    } else {
      alert("Đăng nhập thành công.");
      navigate('/home');
    }
  }

  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Đăng nhập</h1>
        <p>Nhập thông tin tài khoản</p>
        <form>
          <div className="input-group">
            <label>Tài khoản</label>
            <input type="text" name="username" required onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="error text-danger text-center">{error}</div>
          <button type="submit" className="login-button" onClick={logIn}>Đăng nhập</button>
        </form>
        <a href="#" className="forgot-password">Quên mật khẩu?</a>
        <div className="signup-container">
          <p>Chưa có tài khoản?</p>
          <button className="signup-button" > <a style={{ textDecoration: 'none', color: 'white' }} href='/register'>Đăng ký</a></button>
        </div>
      </div>
      <div className="login-right">
        <h1>Chào mừng đến <br /> Chợ sinh viên</h1>
        <p>Đăng nhập để tiếp tục</p>
      </div>
    </div>
  );
};

export default UserLogin;
