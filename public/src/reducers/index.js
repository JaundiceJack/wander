import { combineReducers } from 'redux';
import userReducer  from './userReducer.js';
import photoReducer from './photoReducer.js';
import pageReducer  from './pageReducer.js';

export default combineReducers({
  user:   userReducer,
  photos: photoReducer,
  page:   pageReducer,
})
