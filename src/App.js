import './App.css';
import HomePage from './webpages/Home';
import HomeAdmin from './webpages/HomeAdmin';
import { BrowserRouter,Routes,Route, RouterProvider } from 'react-router-dom';  

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<HomePage/>}/>
        <Route path="/homeAdmin" element={<HomeAdmin/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
