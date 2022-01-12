import { LOGIN_USER_SUCCESS, REGISTER_USER_SUCCESS } from "./action";
import axios from "axios";
import {setAuthToken} from "../../utils";

const loginUserApi = async (data) => {
  return await axios.post('http://127.0.0.1:8000/auth/login/', data).then((response) => response.data);
};

const registerUserApi = async (data) => {
  return await axios.post('http://127.0.0.1:8000/auth/register/', data).then((response) => response.data);
};

const logoutUserApi = async (data) => {
  return await axios.post('http://127.0.0.1:8000/auth/logout/', data).then((response) => response.data);
};


export const loginUser = (data) => async (dispatch) => {
  return await loginUserApi(data)
    .then((resData) => {
      localStorage.setItem('user', JSON.stringify(resData));
      setAuthToken(resData.tokens.access_token);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: resData,
      });
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};

export const setUser = (data) => (dispatch) => {
    localStorage.setItem('user', JSON.stringify(data))
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data,
      });
}


export const logoutUser = () => async (dispatch, getState) => {
    const refresh_token = getState().user.tokens.refresh_token;
    console.log('refresh token', refresh_token)
  return await logoutUserApi({refresh_token})
    .then((resData) => {
      dispatch(setUser({isLoggedIn: false}));
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};

export const registerUser = (data) => async (dispatch) => {
  return await registerUserApi(data)
    .then((resData) => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data,
      });
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};


