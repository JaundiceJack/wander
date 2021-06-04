// Import action types
import {
  CHANGE_PAGE
} from './types';
// Import server actions: to report authorization errors
import { returnErrors, clearErrors } from './errorActions';
// Import the server route
import server from './route';

// When routed to a new page, update the current one in the state
export const changePage = nextPage => dispatch => {
    if (nextPage !== 'login') dispatch(clearErrors());
    dispatch({ type: CHANGE_PAGE, payload: nextPage });
}
