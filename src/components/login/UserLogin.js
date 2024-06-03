// src/Login.js
import React from 'react';
import '../../utility/Login.css';

const UserLogin = () => {
  return (
    <div className="login-container">
      <div className="login-left">
        <h1>Đăng nhập</h1>
        <p>Nhập thông tin tài khoản</p>
        <form>
          <div className="input-group">
            <label>Tài khoản</label>
            <input type="text" name="username" required />
          </div>
          <div className="input-group">
            <label>Mật khẩu</label>
            <input type="password" name="password" required />
          </div>
          <button type="submit" className="login-button">Đăng nhập</button>
        </form>
        <a href="#" className="forgot-password">Quên mật khẩu?</a>
        <div className="signup-container">
          <p>Không có tài khoản?</p>
          <button className="signup-button">Đăng ký</button>
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
