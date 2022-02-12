// This file creates a redux store
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const userFromStorage = localStorage.getItem('user') ?
  JSON.parse(localStorage.getItem('user')) : null;

// Load stuff from the storage into the initial states
const initialState = {
  user: { user: userFromStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools( applyMiddleware(...middleware) )
);

export default store;
