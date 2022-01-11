import { combineReducers } from 'redux';
import userReducer from './user/reducer';
import channelReducer from './channel/reducer'

const rootReducer = combineReducers({
    user: userReducer,
    channel: channelReducer,
});

export { rootReducer as default };
