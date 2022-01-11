import { LOAD_CHANNEL_SUCCESS, CREATE_CHANNEL_SUCCESS, LOAD_ALL_CHANNELS_SUCCESS } from "./action";

const initialState = {
    channels: [],
    allChannels: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_CHANNEL_SUCCESS:
      return { ...state, channels: action.payload };

    case LOAD_ALL_CHANNELS_SUCCESS:
      return { ...state, allChannels: action.payload };

    default:
      return state;
  }
}