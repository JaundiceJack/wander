// Import action types
import {
  GET_WILDLIFE,
  GET_LANDSCAPE,
  GET_HISTORY,
  UPLOAD_PHOTOS,
  UPLOAD_SUCCESS,
  LOADING_WILDLIFE,
  LOADING_LANDSCAPE,
  LOADING_HISTORY
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import token config to authorize updates and returnErrors to register errors
import { tokenConfig } from './authActions';
import { returnErrors, clearErrors } from './errorActions';
// Import the server route
import server from './route';

export const uploadPhotos = (formData) => (dispatch, getState) => {
  const user = getState().auth.user;
  if (user.id) {
    // Convert the new photos to JSON and add in the user's id
    const newAsset = JSON.stringify({...formData, user_id: user.id});
    // Submit a post with the new photos and the json web token
    axios.post(`${server}/api/photos`, newAsset, tokenConfig(getState))
    .then(res => dispatch({ type: UPLOAD_SUCCESS, payload: res.data }))
    .catch(err => { if (err.response)
      dispatch(returnErrors(err.response.data, err.response.status))});
  }
}

// Get the images by category
export const getWildlife = () => dispatch => {
  dispatch(setWildlifeLoading());
  // Send a get request for wildlife photos
  axios.get(`${server}/api/photos/wildlife`)
  .then(res => dispatch({ type: GET_WILDLIFE, payload: res.data }))
  .catch(err => {if (err.response) dispatch(returnErrors(err.response.data, err.response.status))});
}
export const getLandscape = () => dispatch => {
  dispatch(setLandscapeLoading());
  // Send a get request for landscape photos
  axios.get(`${server}/api/photos/landscape`)
  .then(res => dispatch({ type: GET_LANDSCAPE, payload: res.data }))
  .catch(err => {if (err.response) dispatch(returnErrors(err.response.data, err.response.status))});
}
export const getHistory = () => dispatch => {
  dispatch(setHistoryLoading());
  // Send a get request for history photos
  axios.get(`${server}/api/photos/history`)
  .then(res => dispatch({ type: GET_HISTORY, payload: res.data }))
  .catch(err => {if (err.response) dispatch(returnErrors(err.response.data, err.response.status))});
}

// Set the named images to loading for spinner animations & etc.
export const setWildlifeLoading = () => { return { type: LOADING_WILDLIFE } }
export const setLandscapeLoading = () => { return { type: LOADING_LANDSCAPE } }
export const setHistoryLoading = () => { return { type: LOADING_HISTORY } }
