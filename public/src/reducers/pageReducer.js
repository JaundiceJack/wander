import {
CHANGE_PAGE
} from '../actions/types'

const initialState = {
  currentPage: 'home'
}

const pageReducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_PAGE:
      return {
        ...state,
        currentPage: action.payload
      }
    default:
      return state;
  }
};

export default pageReducer;
