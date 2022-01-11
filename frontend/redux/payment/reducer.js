import { LOAD_PAYMENT_SUCCESS, CREATE_PAYMENT_SUCCESS } from "./action";

const initialState = {
    payments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_PAYMENT_SUCCESS:
      return { ...state, payments: action.payload };

    default:
      return state;
  }
}