import { postNewUser, postLogin, postLogout, getUserInfo, postUpdatedUserInfo } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TUser } from "../types/types";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export type TAuthenticationActions = 
  | TSetUserAction
  | TSetAuthChecked;

export type TSetUserAction = {
  readonly type: typeof SET_USER;
  readonly payload: TUser | null;
};

export type TSetAuthChecked = {
  readonly type: typeof SET_AUTH_CHECKED;
  readonly payload: boolean;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TRegisterNewUser = TLogin & {
  name: string;
};

export const setAuthChecked = (value: boolean): TSetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): TSetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const registerNewUser: AppThunk = ({ email, password, name }: TRegisterNewUser) => {
  return function(dispatch: AppDispatch) {
    postNewUser(email, password, name)
      .then(res => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const login: AppThunk = ({ email, password }: TLogin) => {
  return function(dispatch: AppDispatch) {
    postLogin(email, password)
      .then(res => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const logout: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    return postLogout()
      .then(res => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(setUser(null));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const fillProfile: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    return getUserInfo()
      .then(res => {
        dispatch(setUser(res.user));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const updateProfile: AppThunk = ({ name, email, password }: TRegisterNewUser) => {
  return function(dispatch: AppDispatch) {
    return postUpdatedUserInfo(name, email, password)
      .then(res => {
        dispatch(setUser(res.user));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const checkUserAuth: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    if (localStorage.getItem("accessToken")) {
      return getUserInfo()
        .then(res => {
          dispatch(setUser(res.user));
        })
        .catch(() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            dispatch(setUser(null));
         })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
        dispatch(setAuthChecked(true));
    }    
  };
};