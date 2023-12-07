const BASE_URL = 'https://norma.nomoreparties.space/api/';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = (endpoint, options) => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const refreshToken = () => request(
  'auth/token',
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    })    
  }
);

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(`${BASE_URL}${endpoint}`, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getIngredientsRequest = () => request('ingredients');

export const getOrderNumberRequest = (orderElements) => request(
  'orders',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': localStorage.getItem("refreshToken"),
      'ingredients': orderElements
    })
  }
);

export const postPasswordReset = ({ email }) => request(
  'password-reset',
  { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email
    })
  }
);

export const postNewPassword = ({ password, token }) => request(
  'password-reset/reset',
  { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'password': password,
      'token': token
    })
  }
);

export const postNewUser = (email, password, name) => request(
  'auth/register',
  { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email,
      'password': password,
      'name': name
    })
  }
);

export const postLogin = (email, password) => request(
  'auth/login',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  }
);

export const postLogout = () => request(
  'auth/logout',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'token': localStorage.getItem("refreshToken"),
    })
  }
);

export const getUserInfo = () => {
  return fetchWithRefresh(`auth/user`, 
  {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const postUpdatedUserInfo = (name, email, password) => {
  return fetchWithRefresh(`auth/user`,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      'name': name,
      'email': email,
      'password': password
    })
  });
};