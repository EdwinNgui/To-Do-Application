//Authentication reducer for the react-redux to work with

import { LOGIN, LOGOUT } from '../types/authTypes';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action: { type: string }): AuthState => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
