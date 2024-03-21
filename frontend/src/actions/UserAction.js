import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
  } from "../constants/userConstant";
  import axios from "axios";
  
  //LOGIN USER
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
  
      const config = { headers: { "content-type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/logincheck`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  
  //REGISTER USER
  export const register = (userData) => async (dispatch) => {
    try {
      console.log("useData",userData);
      dispatch({ type: REGISTER_USER_REQUEST });
  
      const config = { headers: { "content-type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/reg`, userData, config);
      console.log("data", data);
  
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  