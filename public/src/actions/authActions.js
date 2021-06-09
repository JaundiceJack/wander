// Import action types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CHANGE_PAGE
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { returnErrors, clearErrors } from './errorActions';
// Import the server route
import server from './route';

// When routed to a new page, update the current one in the state
export const changePage = nextPage => dispatch => {
    if (nextPage !== 'login') dispatch(clearErrors());
    dispatch({ type: CHANGE_PAGE, payload: nextPage });
}

// Check the token and load the user
export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });
  // Get the json web token and authenticate the user
  const config = tokenConfig(getState);
  axios.get(`${server}/api/auth/user`, config)
  .then(res => {
    // If successful, return the user data to the current state
    dispatch({ type: USER_LOADED, payload: res.data })})
  .catch(err => {
    // If unsuccessful, put the errors in the current state
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({ type: AUTH_ERROR }) });
}

// Attempt to create a new user with the given username, & password
export const register = ({ username, password, startingBalance }) => dispatch => {
  // Send the registry with the body and config
  axios.post(`${server}/api/users`, ...basicConfig({ username, password, startingBalance }))
  .then(res => { dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  }).catch(err => {
    // If unsuccessful, put the errors in the current state
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({ type: REGISTER_FAIL });
  });
}

// Attempt to log in with the given username and password
export const login = ({ username, password }) => dispatch => {
  // Send the registry with the body and config
  axios.post(`${server}/api/auth`, ...basicConfig({ username, password }))
  .then(res => { dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  }).catch(err => {
    // If unsuccessful, put the errors in the current state
    err.response ?
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
      : returnErrors({msg: err}, null, 'LOGIN_FAIL');
    dispatch({ type: LOGIN_FAIL });
  });
}

// Issue the logout action type
export const logout = ()  => {
  return { type: LOGOUT_SUCCESS };
}

// Set basic headers and a payload for actions that don't require a token
export const basicConfig = payload => {
  // Set headers
  const config = { headers: { 'Content-Type': 'application/json' } };
  // Turn the entries into JSON format for sending to the server
  const body = JSON.stringify(payload);
  return [body, config];
}

// Get a config object with the json web token
export const tokenConfig = getState => {
  const token = getState().auth.token;
  const config = { headers: {"Content-type": "application/json"} };
  if (token) config.headers["x-auth-token"] = token;
  return config;
}
