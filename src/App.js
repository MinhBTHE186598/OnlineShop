import './App.css';

import HomePage from './webpages/Home';
import HomeAdmin from './webpages/HomeAdmin';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import RegisterUser from './webpages/RegisterUser';
import AboutUs from './webpages/AboutUs';
import AddSeller from './webpages/AddSeller';
import MainShop from './webpages/MainShop';
import AddProduct from './webpages/AddProduct';
import Login from './webpages/Login';
import Profile from './webpages/UserProfile';
import Product from './webpages/Product';
import { UserProvider } from './components/context/UserContext';
import HomeManager from './webpages/HomeManager';
import ContactForm from './webpages/contactUs';
import HomeShipper from './webpages/HomeShipper';
function App() {
  return (
    <div>
      {/* npm install react-router-dom neu bi loi */}
      <UserProvider>
        <BrowserRouter>

          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/homeAdmin" element={<HomeAdmin />} />
            <Route path="/addSeller" element={<AddSeller />} />
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/mainShop/:id" element={<MainShop />} />
            <Route path="/mainShop" element={<Navigate to="0" replace />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path='/product/:id' element={<Product />} />
            <Route path='/homeManager' element={<HomeManager/>}/>
            <Route path='/contact' element={<ContactForm/>}/>
            <Route path='/homeShipper' element={<HomeShipper/>}/>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
