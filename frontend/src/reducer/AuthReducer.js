import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_USER_SUCCESS,
  } from "../constants/userConstant";
  
  export const authReducer = (state = { isAuthenticated: false, user: null }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case LOGOUT_USER_SUCCESS:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };
  