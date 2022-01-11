import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import initialState from './initialState';
import rootReducer from './reducers';

export default function configureReduxStore() {
    const middleware = [thunk];

    // Be sure to ONLY add these middlewares in development!
    if (process.env.NODE_ENV !== 'production') {
        middleware.unshift(reduxImmutableStateInvariant());
    }

    const middlewareEnhancer = applyMiddleware(...middleware);
    const storeEnhancer = composeWithDevTools(middlewareEnhancer);
    return createStore(rootReducer, initialState, storeEnhancer);
}