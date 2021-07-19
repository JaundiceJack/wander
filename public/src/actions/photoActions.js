// Import action types
import {
  GET_NAMES,
  GET_WILDLIFE,
  CLEAR_WILDLIFE,
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
      console.log("Upload success!");
      dispatch({ type: UPLOAD_SUCCESS, payload: res.data })})
    .catch(err => { if (err.response)
      console.log("Upload failure!");
      dispatch(returnErrors(err.response.data, err.response.status))});
  }
}

// Get each wildlife image/thumbnail and put in in the current state
export const getWildImages = () => dispatch => {
  // Create header configurations
  const basicConfig = { headers: { "Content-type": "application/json" }};
  const imageConfig = { headers: {"Content-type": "application/json"}, responseType: 'arraybuffer'}
  // Get the list of photo names
  axios.get(`${server}/api/photos/wildlife`, basicConfig)
  .then(res => {
    // Clear the current images and names from the state
    dispatch({ type: CLEAR_WILDLIFE });
    // Loop over the filenames and get each one's thumbnail and original image
    if (res.data) { res.data.forEach(file => {
      let thumbAndPicture = {original: null, thumbnail: null};
      // Make a request for the thumbnail
      axios.get(`${server}/api/photos/wildlife/thumb/${file.filename}`, imageConfig)
      .then(res => {
        if (res.data) thumbAndPicture.thumbnail = convertImageStream(res.data);
      }).catch(err => console.log(err));
      // Make a request for the original image
      axios.get(`${server}/api/photos/wildlife/${file.filename}`, imageConfig)
      .then(res => {
        if (res.data) thumbAndPicture.original = convertImageStream(res.data);
      }).catch(err => console.log(err));
      // Add the images to the current state
      dispatch({ type: GET_WILDLIFE, payload: thumbAndPicture });
    })}
  }).catch(err => {console.log(err)})
}

export const getWild = () => dispatch => {
  const basicConfig = { headers: { "Content-type": "application/json" }};
  axios.get(`${server}`)
}

// Retreive the requested image
const getImage = (type, name) => {
  const basicConfig = { headers: { "Content-type": "application/json" }};
  switch(type) {
    case 'wildlife':
      return axios.get(`${server}/api/photos/wildlife/${name}`, basicConfig);
    case 'landscape':
      return axios.get(`${server}/api/photos/landscape/${name}`, basicConfig);
    case 'history':
      return axios.get(`${server}/api/photos/history/${name}`, basicConfig);
    default:
      return null;
  }
}
// Retreive the requested image's thumbnail
const getThumbnail = (type, name) => {
  const basicConfig = { headers: { "Content-type": "application/json" }};
  switch(type) {
    case 'wildlife':
      return axios.get(`${server}/api/photos/wildlife/thumb/${name}`, basicConfig);
    case 'landscape':
      return axios.get(`${server}/api/photos/landscape/thumb/${name}`, basicConfig);
    case 'history':
      return axios.get(`${server}/api/photos/history/thumb/${name}`, basicConfig);
    default:
      return null;
  }
}
export const getImages = (type) => dispatch => {
  const basicConfig = { headers: { "Content-type": "application/json" }};
  axios.get(`${server}/api/photos/wlall`, basicConfig)
  .then(res => {
    console.log(res.data);
    dispatch({type: GET_WILDLIFE, payload: res.data});
    //let promises = [];
    //res.data.forEach(file => {
    //  promises.push(() => getImage('wildlife', file.filename));
    //  promises.push(() => getThumbnail('wildlife', file.filename));
    //})
    //Promise.all(promises)
    //.then(images => {
    //  images.map(image)
    //})
  })
}


export const getWildlifePhotos = () => dispatch => {
  const basicConfig = { headers: { "Content-type": "application/json" }};
  axios.get(`${server}/api/photos/wildlife/all`, basicConfig)
  .then(res => {
    if (res.data) {
      let images = [];
      res.data.thumbs.forEach(thumb => {
        let pair = {original: null, thumbnail: thumb};
        images.push(pair);
      })
      res.data.originals.forEach((original, index) => {
        images[index].original = original;
      })
      dispatch({ type: GET_WILDLIFE, payload: images });
    }
  })
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

const convertImageStream = imageStream => {
  const arrayBufferView = new Uint8Array( imageStream );
  const blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL( blob );
}
