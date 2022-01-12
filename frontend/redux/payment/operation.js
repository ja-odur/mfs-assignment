import { LOAD_PAYMENT_SUCCESS, CREATE_PAYMENT_SUCCESS} from "./action";
import axios from "axios";
import { updateMainAlert } from "../MainAlert/operations";
import {setAuthToken, createAlertBarExtraContentFromObject} from "../../utils";

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
        dispatch(
            updateMainAlert({
                show: true,
                message: "Some Errors occurred",
                severity: 'error',
                extra: createAlertBarExtraContentFromObject(err.response.data)})
        )
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
      dispatch(updateMainAlert({show: true, message: "Transfer successfully made"}))
      dispatch(loadPayments());
    })
    .catch((err) => {
        dispatch(
            updateMainAlert({
                show: true,
                message: "Some Errors occurred",
                severity: 'error',
                extra: createAlertBarExtraContentFromObject(err.response.data)})
        )
        console.log('error', err.response.data)
    });
};



