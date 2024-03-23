import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { cartReducer } from "./reducer/CartReducer";
import { categoryReducer } from "./reducer/categoryReducer";
import { userReducer } from "./reducer/UserReducer";

const reducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
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
};

const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
