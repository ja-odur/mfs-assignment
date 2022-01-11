import { LOAD_CHANNEL_SUCCESS, CREATE_CHANNEL_SUCCESS, LOAD_ALL_CHANNELS_SUCCESS } from "./action";
import axios from "axios";

const createChannelApi = async (data) => {
  return await axios.post('http://127.0.0.1:8001/channel/', data).then((response) => response.data);
};

const loadChannelsApi = async () => {
  return await axios.get('http://127.0.0.1:8001/channel/').then((response) => response.data);
};

const loadAllChannelsApi = async () => {
  return await axios.get('http://127.0.0.1:8001/channel/all/').then((response) => response.data);
};

export const loadChannels = () => async (dispatch) => {
  return await loadChannelsApi()
    .then((resData) => {
        console.log('data data', resData)
      dispatch({
        type: LOAD_CHANNEL_SUCCESS,
        payload: resData,
      });
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};

export const createChannel = (data) => async (dispatch) => {
  return await createChannelApi(data)
    .then((resData) => {
      dispatch({
        type: CREATE_CHANNEL_SUCCESS,
        payload: resData,
      });
      dispatch(loadChannels());
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};

export const loadAllChannels = () => async (dispatch) => {
  return await loadAllChannelsApi()
    .then((resData) => {
        console.log('data data', resData)
      dispatch({
        type: LOAD_ALL_CHANNELS_SUCCESS,
        payload: resData,
      });
    })
    .catch((err) => {
        console.log('error', err.response.data)
    });
};



