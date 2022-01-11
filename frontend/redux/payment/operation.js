import { LOAD_PAYMENT_SUCCESS, CREATE_PAYMENT_SUCCESS} from "./action";
import axios from "axios";

const createPaymentApi = async (data) => {
  return await axios.post('http://127.0.0.1:8001/payment/', data).then((response) => response.data);
};

const loadPaymentsApi = async () => {
  return await axios.get('http://127.0.0.1:8001/payment/').then((response) => response.data);
};

export const loadPayments = () => async (dispatch) => {
  return await loadPaymentsApi()
    .then((resData) => {
      dispatch({
        type: LOAD_PAYMENT_SUCCESS,
        payload: resData,
      });
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};
export const createPayment = (data) => async (dispatch) => {
  return await createPaymentApi(data)
    .then((resData) => {
      dispatch({
        type: CREATE_PAYMENT_SUCCESS,
        payload: resData,
      });
      dispatch(loadPayments());
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};



