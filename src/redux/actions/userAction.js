import axios from "axios";
import { URL } from "../../ServerSideConfig/BackendPort";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
} from "../contants/user-constant";

export const signin = (email, password, navigate) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${URL}/api/login`, {
      email,
      password,
    });

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user_info });
    localStorage.setItem("userInfo", JSON.stringify(data.user_info));
    localStorage.setItem("token", JSON.stringify(data.access_token));
    navigate("/home");
  } catch (err) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        err.response && err.response.message
          ? err.response.data.message
          : err.message,
    });
  }
};
export const register =
  (name, email, password, navigate) => async (dispatch) => {
    dispatch({
      type: USER_REGISTER_REQUEST,
      payload: { name, email, password },
    });
    try {
      const { data } = await axios.post(`${URL}/api/register`, {
        name,
        email,
        password,
      });

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data.user_info });
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data.user_info });
      localStorage.setItem("userInfo", JSON.stringify(data.user_info));
      localStorage.setItem("token", JSON.stringify(data.access_token));
      navigate("/home");
    } catch (err) {
      console.log("show me the error:", err);

      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
export const signout = (navigate) => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: USER_SIGNOUT });
  navigate("/");
};
