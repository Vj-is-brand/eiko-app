import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Mainpage from './components/Mainpage';
import Products from './components/Products';
import Login from './components/admin/Login';
import Register from './components/admin/Register';
import Admindash from './components/admin/AdminDash';
import ProductDash from './components/admin/ProductDash';
import CategoryDash from './components/admin/CatDash';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrders from './components/Cart/ConfirmOrders';
import LoginSignup from './components/user/LoginSignup';
<<<<<<< HEAD
import Profile from './components/user/Profile';
=======
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b


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
        <Route path='/categorydash' element={<CategoryDash />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/orders/confirm' element={<ConfirmOrders />} />
        <Route path='/user/login' element={<LoginSignup />} />
<<<<<<< HEAD
        <Route path='/user/profile' element={<Profile />} />

=======
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b


        
      </Routes>
    </BrowserRouter>



  );
}

export default App;
