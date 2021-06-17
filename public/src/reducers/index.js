import {combineReducers} from 'redux';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';
import photoReducer from './photoReducer.js';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  photos: photoReducer
})
