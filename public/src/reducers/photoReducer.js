import {
  WILDLIFE_LIST_REQUEST,  WILDLIFE_LIST_SUCCESS,  WILDLIFE_LIST_FAILURE,
  LANDSCAPE_LIST_REQUEST, LANDSCAPE_LIST_SUCCESS, LANDSCAPE_LIST_FAILURE,
  HISTORY_LIST_REQUEST,   HISTORY_LIST_SUCCESS,   HISTORY_LIST_FAILURE,
  PHOTO_UPLOAD_REQUEST,   PHOTO_UPLOAD_SUCCESS,   PHOTO_UPLOAD_FAILURE,
  PHOTO_DELETE_REQUEST,   PHOTO_DELETE_SUCCESS,   PHOTO_DELETE_FAILURE,
  PHOTO_ERROR_CLEAR
} from '../actions/types.js';

const initialState = {
  wildlife: [],
  landscape: [],
  history: [],
  loading: false,
  error: null
}

const photoReducer = (state = initialState, action) => {
  switch(action.type) {
    case WILDLIFE_LIST_REQUEST:
    case LANDSCAPE_LIST_REQUEST:
    case HISTORY_LIST_REQUEST:
    case PHOTO_UPLOAD_REQUEST:
    case PHOTO_DELETE_REQUEST:
      return { ...state, loading: true };
    case WILDLIFE_LIST_FAILURE:
    case LANDSCAPE_LIST_FAILURE:
    case HISTORY_LIST_FAILURE:
    case PHOTO_UPLOAD_FAILURE:
    case PHOTO_DELETE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case WILDLIFE_LIST_SUCCESS:
      return { ...state, loading: false, wildlife: action.payload };
    case LANDSCAPE_LIST_SUCCESS:
      return { ...state, loading: false, landscape: action.payload };
    case HISTORY_LIST_SUCCESS:
      return { ...state, loading: false, history: action.payload };
    case PHOTO_UPLOAD_SUCCESS:
      return { ...state, loading: false,
        wildlife: action.payload.wildlife,
        landscape: action.payload.landscape,
        history: action.payload.history
      };
    case PHOTO_DELETE_SUCCESS:
      return { ...state,
        wildlife: state.wildlife.filter(image => image._id !== action.payload),
        landscape: state.landscape.filter(image => image._id !== action.payload),
        history: state.history.filter(image => image._id !== action.payload),
        loading: false
      }
    case PHOTO_ERROR_CLEAR:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default photoReducer;
