import './App.css';
import HomePage from './webpages/Home';
import HomeAdmin from './webpages/HomeAdmin';
import { BrowserRouter,Routes,Route } from 'react-router-dom'; 
import RegisterUser from './webpages/RegisterUser';
import AboutUs from './webpages/AboutUs';
import AddSeller from './webpages/AddSeller';

function App() {
  return (
    <div>
      {/* npm install react-router-dom neu bi loi */}
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/homeAdmin" element={<HomeAdmin/>}/>
        <Route path="/addSeller" element={<AddSeller/>}/>
        <Route path="/register" element={<RegisterUser/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
