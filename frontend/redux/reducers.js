import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import channelReducer from './channel/reducer'
import paymentReducer from './payment/reducer'
import mainAlertReducer from './MainAlert/reducers';

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
    payment: paymentReducer,
    mainAlert: mainAlertReducer ,
});

export { rootReducer as default };
