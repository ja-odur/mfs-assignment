import { LOGIN_USER_SUCCESS } from "./action";
import axios from "axios";

const loginUserApi = async (data) => {
  return await axios.post('http://127.0.0.1:8000/auth/login/', data).then((response) => response.data);
};

const logoutUserApi = async (data) => {
  return await axios.post('http://127.0.0.1:8000/auth/logout/', data).then((response) => response.data);
};


export const loginUser = (data) => async (dispatch) => {
  return await loginUserApi(data)
    .then((resData) => {
      localStorage.setItem('user', JSON.stringify(resData))
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
