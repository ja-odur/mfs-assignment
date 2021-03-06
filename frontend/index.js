import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import createReduxStore from './redux/createStore';
import jwt_decode from "jwt-decode";
import {setAuthToken} from "./utils";
import { setUser } from "./redux/user/operation";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from '@material-ui/core';
import Home from './src/components/Home'

import './index.css';

const store = createReduxStore();


if (localStorage.user) {
  // Set auth token header auth
  const user = JSON.parse(localStorage.user);

    try {
        const decoded = jwt_decode(user.tokens && user.tokens.access_token || '');
        const currentTime = Date.now() / 1000; // to get in milliseconds
        if (decoded.exp < currentTime) {
            store.dispatch(setUser({isLoggedIn: false}))
            setAuthToken(null)
        } else {
            store.dispatch(setUser({...user, isLoggedIn: true}))
            setAuthToken(user.tokens && user.tokens.access_token || '')
        }
    } catch (err)  {
      console.log('user', user)
      console.log('errpr', err)
    }


}

const root = document.getElementById('app');

// Bootstrap the main app
render(
    <ReduxProvider store={store}>
        <ThemeProvider theme={createTheme({})}>
            <Home />
        </ThemeProvider>
    </ReduxProvider>, root);