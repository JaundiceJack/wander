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
} from '../actions/types'

const initialState = {
  token: window.localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  currentPage: 'home'
}

const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      window.localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        currentPage: 'upload'
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case AUTH_ERROR:
    case REGISTER_FAIL:
      window.localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        currentPage: 'login'
      };
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    default:
      return state;
  }
};

export default authReducer;
