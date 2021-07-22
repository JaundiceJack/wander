import {
  GET_WILDLIFE,
  LOADING_WILDLIFE,
  GET_LANDSCAPE,
  LOADING_LANDSCAPE,
  GET_HISTORY,
  LOADING_HISTORY,
  UPLOAD_PHOTOS,
  UPLOAD_SUCCESS } from '../actions/types.js';

const initialState = {
  wildlife: [],
  wildlifeLoading: false,
  landscape: [],
  landscapeLoading: false,
  history: [],
  historyLoading: false
}

const photoReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADING_WILDLIFE:
      return {
        ...state,
        wildlifeLoading: true
      }
    case GET_WILDLIFE:
      return {
        ...state,
        wildlifeLoading: false,
        wildlife: action.payload,
      }
    case LOADING_LANDSCAPE:
      return {
        ...state,
        landscapeLoading: true
      }
    case GET_LANDSCAPE:
      return {
        ...state,
        landscapeLoading: false,
        landscape: action.payload,
      }
    case LOADING_HISTORY:
      return {
        ...state,
        historyLoading: true
      }
    case GET_HISTORY:
      return {
        ...state,
        historyLoading: false,
        history: action.payload,
      }
    case UPLOAD_PHOTOS:
      return {
        ...state
      }
    case UPLOAD_SUCCESS:
      return {
        ...state
      }
    default:
      return state;
  }
};

export default photoReducer;
