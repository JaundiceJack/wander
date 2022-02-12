import {
  PAGE_CHANGE_REQUEST
} from '../actions/types'

const initialState = { page: 'home' }

const pageReducer = (state = initialState, action) => {
  switch(action.type) {
    case PAGE_CHANGE_REQUEST:
      return { ...state, page: action.payload }
    default:
      return state;
  }
};

export default pageReducer;
