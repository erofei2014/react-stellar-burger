import {
  SET_USER,
  SET_AUTH_CHECKED
} from '../actions/authentification';

const initialState = {
  user: null,
  isAuthChecked: false
}

export const authentificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: true
      }
    default:
      return state;
  }
};