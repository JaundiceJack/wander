import { USER_ERROR_CLEAR, PHOTO_ERROR_CLEAR } from './types.js';

export const handleError = err => {
  return err.response &&
           err.response.data.message ?
           err.response.data.message : err.message;
};

export const clearError = type => dispatch => {
  switch (type) {
    case 'user':
      dispatch({ type: USER_ERROR_CLEAR });
      break;
    case 'photos':
      dispatch({ type: PHOTO_ERROR_CLEAR });
      break;
    case 'all':
      dispatch({ type: USER_ERROR_CLEAR });
      dispatch({ type: PHOTO_ERROR_CLEAR });
      break;
    default:
      dispatch({ type: type });
  }
};
