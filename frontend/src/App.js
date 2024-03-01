import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Products from './components/Products';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import Admindash from './components/admin/AdminDash';
import ProductDash from './components/admin/ProductDash';

function App() {
  return (
    <BrowserRouter>
      <Routes id="main-container">
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login"  element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Admindash />} />
        <Route path='/productdash' element={<ProductDash />} />
        
      </Routes>
    </BrowserRouter>



  );
}

export default App;
