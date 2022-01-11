import {LOGIN_USER_SUCCESS} from "./action";

const initialState = {
    isLoggedIn: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return { ...action.payload, isLoggedIn: true };

    default:
      return state;
  }
}