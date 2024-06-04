import './App.css';

import HomePage from './webpages/Home';
import HomeAdmin from './webpages/HomeAdmin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterUser from './webpages/RegisterUser';
import AboutUs from './webpages/AboutUs';
import AddSeller from './webpages/AddSeller';
import MainShop from './webpages/MainShop';
import AddProduct from './webpages/AddProduct';
import Login from './webpages/Login';
import Profile from './webpages/UserProfile';
function App() {
  return (
    <div>
      {/* npm install react-router-dom neu bi loi */}
      <BrowserRouter>

      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/homeAdmin" element={<HomeAdmin/>}/>
        <Route path="/addSeller" element={<AddSeller/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/aboutUs" element={<AboutUs/>}/>
        <Route path="/mainShop" element={<MainShop/>}/>
        <Route path="/addProduct" element={<AddProduct/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>

      </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;
