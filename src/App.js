import './App.css';
import HomePage from './webpages/Home';
import HomeAdmin from './webpages/HomeAdmin';
import { BrowserRouter,Routes,Route, RouterProvider } from 'react-router-dom';  

import AddSaler from './webpages/AddSaler';

function App() {
  return (
    <div>
      {/* npm install react-router-dom neu bi loi */}
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/homeAdmin" element={<HomeAdmin/>}/>
        <Route path="/addSaler" element={<AddSaler/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;