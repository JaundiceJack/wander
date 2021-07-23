// Import action types
import {
  GET_WILDLIFE,
  GET_LANDSCAPE,
  GET_HISTORY,
  UPLOAD_SUCCESS,
  LOADING_WILDLIFE,
  LOADING_LANDSCAPE,
  LOADING_HISTORY
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import returnErrors to register errors
import { returnErrors } from './errorActions';
// Import the server route
import server from './route';

// Upload the photos in the wildlife, landscape, and history form-fields
export const uploadPhotos = (formData) => (dispatch, getState) => {
  // Check for the user to authenticate
  const user = getState().auth.user;
  if (user._id) {
    // Set headers and the content type to handle form data
    const token = getState().auth.token;
    const config = { headers: {"Content-type": "multipart/form-data"} };
    if (token) config.headers["x-auth-token"] = token;
    // Submit a post with the new photos and the json web token
    axios.post(`${server}/api/photos`, formData, config)
    .then(res => {
      // TODO: change the error reducer to a message reducer to display success messages as well
      console.log("Upload success!");
      dispatch({ type: UPLOAD_SUCCESS, payload: res.data })})
    .catch(err => { if (err.response)
      console.log("Upload failure!");
      dispatch(returnErrors(err.response.data, err.response.status))});
  }
}

// Make a basic request header for json data
const basicConfig = { headers: { "Content-type": "application/json" }};

// Get each wildlife image/thumbnail link and put in in the current state
export const getWildlife = () => dispatch => {
  dispatch(setWildlifeLoading());
  axios.get(`${server}/api/photos/wildlife`, basicConfig)
  .then(res => { dispatch({type: GET_WILDLIFE, payload: res.data}); })
  .catch(err => { dispatch(returnErrors(err.response.data, err.response.status)) })
}
// Get each landscape image/thumbnail link and put in in the current state
export const getLandscape = () => dispatch => {
  dispatch(setLandscapeLoading());
  axios.get(`${server}/api/photos/landscape`, basicConfig)
  .then(res => { dispatch({type: GET_LANDSCAPE, payload: res.data}); })
  .catch(err => { dispatch(returnErrors(err.response.data, err.response.status)) })
}
// Get each history image/thumbnail link and put in in the current state
export const getHistory = () => dispatch => {
  dispatch(setHistoryLoading());
  axios.get(`${server}/api/photos/history`, basicConfig)
  .then(res => { dispatch({type: GET_HISTORY, payload: res.data}); })
  .catch(err => { dispatch(returnErrors(err.response.data, err.response.status)) })
}

// Set the named images to loading for spinner animations & etc.
export const setWildlifeLoading = () => { return { type: LOADING_WILDLIFE } }
export const setLandscapeLoading = () => { return { type: LOADING_LANDSCAPE } }
export const setHistoryLoading = () => { return { type: LOADING_HISTORY } }
