import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import channelReducer from './channel/reducer'
import paymentReducer from './payment/reducer'

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    payment: paymentReducer,
});

export { rootReducer as default };
