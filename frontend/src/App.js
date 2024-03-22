import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Mainpage from "./components/Mainpage";
import Products from "./components/Products";
import Login from "./components/admin/Login";
import Register from "./components/admin/Register";
import Admindash from "./components/admin/AdminDash";
import ProductDash from "./components/admin/ProductDash";
import CategoryDash from "./components/admin/CatDash";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrders from "./components/Cart/ConfirmOrders.js";
import ProductDetails from "./components/ProductDetails.js";
import Footer from "./partials/Footer.js";
import Header from "./partials/Header.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes id="main-container">
        <Route path="/" element={<Mainpage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Admindash />} />
        <Route path="/productdash" element={<ProductDash />} />
        <Route path="/categorydash" element={<CategoryDash />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/orders/confirm" element={<ConfirmOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
