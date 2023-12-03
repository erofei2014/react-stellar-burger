import { postNewUser, postLogin, postLogout, getUserInfo, postUpdatedUserInfo } from "../../utils/burger-api";

export const SET_USER = 'SET_USER';
export const SET_AUTH_CHECKED = 'SET_AUTH_CHECKED';

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const registerNewUser = ({ email, password, name }) => {
  return function(dispatch) {
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

export const login = ({ email, password }) => {
  return function(dispatch) {
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

export const logout = () => {
  return function(dispatch) {
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

export const fillProfile = () => {
  return function(dispatch) {
    return getUserInfo()
      .then(res => {
        dispatch(setUser(res.user));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const updateProfile = ({ name, email, password }) => {
  return function(dispatch) {
    return postUpdatedUserInfo(name, email, password)
      .then(res => {
        dispatch(setUser(res.user));
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export const checkUserAuth = () => {
  return function(dispatch) {
    if (localStorage.getItem("accessToken")) {
      dispatch(fillProfile())
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