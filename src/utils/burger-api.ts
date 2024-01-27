import { TIngredient, TOrder } from "../services/types/types";

const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const WS_URL_ALL_ORDERS = 'wss://norma.nomoreparties.space/orders/all';
export const WS_URL_USER_ORDERS = 'wss://norma.nomoreparties.space/orders';

type TServerResponse<T> = T & {
  success: boolean;
};

type TRefreshToken = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TGetUser = TServerResponse<{
  user: {
    email: string;
    name: string;
  }
}>;

type TSetUser = TRefreshToken & TGetUser;

type TGetOrder = TServerResponse<{
  order: TOrder;
}>;

type TGetOrders = TServerResponse<{
  orders: TOrder[];
}>;

type TGetIngredients = TServerResponse<{
  data: TIngredient[];
}>;


const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const checkSuccess = <T>(res: TServerResponse<T>): Promise<T> | T => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};

const request = <T>(endpoint: string, options?: {}): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess<T>);
};

export const refreshToken = (): Promise<TRefreshToken> => request(
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

export const fetchWithRefresh = async <T>(endpoint: string, options: {[key: string]: any}): Promise<T> => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    return await checkResponse(res);
  } catch (err: any) {
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

export const wsWithRefresh = async () => {
  const refreshData = await refreshToken();
  if (!refreshData.success) {
    return Promise.reject(refreshData);
  }

  localStorage.setItem("refreshToken", refreshData.refreshToken);
  localStorage.setItem("accessToken", refreshData.accessToken);

  return `${WS_URL_USER_ORDERS}?token=${refreshData.accessToken.split(' ')[1]}`;
};

export const getIngredientsRequest = (): Promise<TGetIngredients> => request('ingredients');

export const getOrderNumberRequest = (orderElements: TOrder[]): Promise<TGetOrder> => {
  return fetchWithRefresh('orders',
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        'ingredients': orderElements
      })
    }
  );
};

export const getOrderInformationRequest = (orderNumber: number): Promise<TGetOrders> => request(
  `orders/${orderNumber}`,
  { 
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  }
);

export const postPasswordReset = (email: string) => request(
  'password-reset',
  { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      'email': email
    })
  }
);

export const postNewPassword = (password: string, token: string) => request(
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

export const postNewUser = (email: string, password: string, name: string): Promise<TSetUser> => request(
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

export const postLogin = (email: string, password: string): Promise<TSetUser> => request(
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

export const getUserInfo = (): Promise<TGetUser> => {
  return fetchWithRefresh(`auth/user`, 
  {
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  });
};

export const postUpdatedUserInfo = (name: string, email: string, password: string): Promise<TGetUser> => {
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