// src/store/reducers/authReducer.js

import { LOGIN_SUCCESS, LOGOUT } from '../actions/type';

// The initial state for our authentication
const initialState = {
  isAuthenticated: false,
  user: null, // This will store user info like email and role after login
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload, // The user object from the action
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;