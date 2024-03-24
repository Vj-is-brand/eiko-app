import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { cartReducer } from "./reducer/CartReducer";
<<<<<<< HEAD
import { authReducer } from './reducer/AuthReducer';
=======
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
import { categoryReducer } from "./reducer/categoryReducer";
import { userReducer } from "./reducer/UserReducer";

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
<<<<<<< HEAD
  auth: authReducer,
=======
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
  category: categoryReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  category: {
    categoryItems: localStorage.getItem("categoryItems")
      ? JSON.parse(localStorage.getItem("categoryItems"))
      : [],
  },
<<<<<<< HEAD
  auth: {
    isAuthenticated: false,
    user: null, // You can add more user related fields here
  },
=======
>>>>>>> 7dc58301dba6451e391c03ca79b3497b85caf71b
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
