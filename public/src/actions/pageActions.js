// Import action types
import {
  PAGE_CHANGE_REQUEST
} from './types';
import { clearError } from './errorActions.js';

// When routed to a new page, update the current one in the state
export const changePage = nextPage => dispatch => {
    if (nextPage !== 'login') dispatch(clearError('all'));
    dispatch({ type: PAGE_CHANGE_REQUEST, payload: nextPage });
}
