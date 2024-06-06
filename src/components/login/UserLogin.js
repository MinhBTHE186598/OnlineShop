// src/Login.js
import React from 'react';
import '../../utility/Login.css';
import Image from 'react-bootstrap/Image';
import login1 from '../../utility/login1.jpg'; // Adjust the path as necessary
import axios from 'axios';
const UserLogin = () => {
  const [value, setValues] = React.useState({
    username: '',
    password: '',
  })
  const handleInput = (event) => {
    const name = event.target.name
    const value = event.target.value
    setValues({ ...value, [name]: value })
  }
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:5000/Login', value)
      .then(res => {
        console.log(res);
        navigate('/home')
      })
  }
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Đăng nhập</h1>
        <p>Nhập thông tin tài khoản</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tài khoản</label>
            <input type="text" name="username" onChange={handleInput} required />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" onChange={handleInput} required />
          </div>
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        <a href="#" className="forgot-password">Quên mật khẩu?</a>
        <div className="signup-container">
          <p>Không có tài khoản?</p>
          <button className="signup-button">Đăng ký</button>
        </div>
      </div>
      <div className="login-right" >
        <Image src={login1} className="login1" alt="login1" />
        <h1>Chào mừng đến <br /> Chợ sinh viên</h1>
        <p>Đăng nhập để tiếp tục</p>
      </div>
    </div>
  );
};

export default UserLogin;
