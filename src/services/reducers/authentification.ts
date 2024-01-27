import {
  SET_USER,
  SET_AUTH_CHECKED
} from '../actions/authentification';
import { TUser } from '../types/types';
import { TAuthentificationActions } from '../actions/authentification';


export type TAuthentificationState = {
  user: null | TUser;
  isAuthChecked: boolean;
};

const initialState: TAuthentificationState = {
  user: null,
  isAuthChecked: false
}

export const authentificationReducer = (state = initialState, action: TAuthentificationActions): TAuthentificationState => {
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