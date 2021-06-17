// Import action types
import {
  GET_WILDLIFE,
  GET_LANDSCAPE,
  GET_HISTORY,
  UPLOAD_PHOTOS
} from './types';
// Import axios to handle http requests
import axios from 'axios';
// Import server actions: to report authorization errors
import { returnErrors, clearErrors } from './errorActions';
// Import the server route
import server from './route';


export const uploadPhotos = () => dispatch => {
  // Create a body to upload

  // Send a post request

  // Display a success or failure message

}

export cont getWildlife = () => dispatch => {
  // Send a get request for wildlife photos
  axios.get('/api/wildlife')
}
