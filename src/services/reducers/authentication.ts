import {
  SET_USER,
  SET_AUTH_CHECKED
} from '../actions/authentication';
import { TUser } from '../types/types';
import { TAuthenticationActions } from '../actions/authentication';


export type TAuthenticationState = {
  user: null | TUser;
  isAuthChecked: boolean;
};

const initialState: TAuthenticationState = {
  user: null,
  isAuthChecked: false
}

export const authenticationReducer = (state = initialState, action: TAuthenticationActions): TAuthenticationState => {
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