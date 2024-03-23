import React, { useState } from "react";
import CartItemCard from "./CartItemCard";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemFromCart } from "../../actions/CartAction";
import { MdRemoveShoppingCart } from "react-icons/md";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Footer from "../../partials/Footer";
import Header from "../../partials/Header";

const Cart = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  console.log("cartItems are :", cartItems);

  const increseCartyQty = (id, quantity) => {
    const newQty = quantity + 1;
    if (5 <= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const decreseCartyQty = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteItemHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping", { replace: true });
  };

  return (
    <>
      {/* <Header /> */}
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart />
          <Typography> No items in the cart </Typography>
          <Link to={"/products"}>view products</Link>
        </div>
      ) : (
        <>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {cartItems &&
              cartItems.map((item, index) => (
                <div className="cartContainer" key={index}>
                  <CartItemCard
                    item={item}
                    deleteCartItem={deleteItemHandler}
                  />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        increseCartyQty(item.product, item.quantity)
                      }
                    >
                      +
                    </button>
                    <input type="number" value={item.quantity} />
                    <button
                      onClick={() =>
                        decreseCartyQty(item.product, item.quantity)
                      }
                    >
                      -
                    </button>
                  </div>
                  <div className="cartSubtotal">{`${
                    item.price * item.quantity
                  }`}</div>
                </div>
              ))}
            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (accum, currentVal) =>
                    accum + currentVal.price * currentVal.quantity,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
              <div></div>
            </div>
          </div>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default Cart;
