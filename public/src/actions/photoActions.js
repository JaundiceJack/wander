// Import action types
import {
  WILDLIFE_LIST_REQUEST,  WILDLIFE_LIST_SUCCESS,  WILDLIFE_LIST_FAILURE,
  LANDSCAPE_LIST_REQUEST, LANDSCAPE_LIST_SUCCESS, LANDSCAPE_LIST_FAILURE,
  HISTORY_LIST_REQUEST,   HISTORY_LIST_SUCCESS,   HISTORY_LIST_FAILURE,
  PHOTO_UPLOAD_REQUEST,   PHOTO_UPLOAD_SUCCESS,   PHOTO_UPLOAD_FAILURE,
  PHOTO_DELETE_REQUEST,   PHOTO_DELETE_SUCCESS,   PHOTO_DELETE_FAILURE,
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import returnErrors to register errors
import { handleError } from './errorActions.js';

// Create a config variable to send with routes requiring authorization
const tokenConfig = getState => {
  const { user: { user } } = getState();
  return { headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user.token}`
  }};
}

// Make a basic request header for json data
const basicConfig = { headers: { "Content-type": "application/json" } };

// Upload the photos in the wildlife, landscape, and history form-fields
export const uploadPhotos = formData => async (dispatch, getState) => {
  dispatch({ type: PHOTO_UPLOAD_REQUEST });
  try {
    const { data } = await axios.post(`/api/photos`, formData, tokenConfig(getState));
    dispatch({ type: PHOTO_UPLOAD_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: PHOTO_UPLOAD_FAILURE, payload: handleError(e) }); };
}

// Remove the selected photo from the database
export const deletePhoto = id => async (dispatch, getState) => {
  dispatch({ type: PHOTO_DELETE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/photos/${id}`, tokenConfig(getState));
    dispatch({ type: PHOTO_DELETE_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: PHOTO_DELETE_FAILURE, payload: handleError(e) }); };
}

// Get each wildlife image/thumbnail link and put in in the current state
export const getWildlife = () => async dispatch => {
  dispatch({ type: WILDLIFE_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/photos/wildlife`, basicConfig);
    dispatch({ type: WILDLIFE_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: WILDLIFE_LIST_FAILURE, payload: handleError(e) }); }
}

// Get each landscape image/thumbnail link and put in in the current state
export const getLandscape = () => async dispatch => {
  dispatch({ type: LANDSCAPE_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/photos/landscape`, basicConfig);
    dispatch({ type: LANDSCAPE_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: LANDSCAPE_LIST_FAILURE, payload: handleError(e) }); }
}

// Get each history image/thumbnail link and put in in the current state
export const getHistory = () => async dispatch => {
  dispatch({ type: HISTORY_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/photos/history`, basicConfig);
    dispatch({ type: HISTORY_LIST_SUCCESS, payload: data });
  } catch (e) { dispatch({ type: HISTORY_LIST_FAILURE, payload: handleError(e) }); }
}
