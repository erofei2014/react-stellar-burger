export const WS_CONNECTION_START_ALL_ORDERS = 'WS_CONNECTION_START_ALL_ORDERS';
export const WS_CONNECTION_SUCCESS_ALL_ORDERS = 'WS_CONNECTION_SUCCESS_ALL_ORDERS';
export const WS_CONNECTION_ERROR_ALL_ORDERS = 'WS_CONNECTION_ERROR_ALL_ORDERS';
export const WS_CONNECTION_CLOSED_ALL_ORDERS = 'WS_CONNECTION_CLOSED_ALL_ORDERS';
export const WS_GET_ALL_ORDERS = 'WS_GET_ALL_ORDERS';
export const WS_CONNECTION_START_USER_ORDERS = 'WS_CONNECTION_START_USER_ORDERS';
export const WS_CONNECTION_SUCCESS_USER_ORDERS = 'WS_CONNECTION_SUCCESS_USER_ORDERS';
export const WS_CONNECTION_ERROR_USER_ORDERS = 'WS_CONNECTION_ERROR_USER_ORDERS';
export const WS_CONNECTION_CLOSED_USER_ORDERS = 'WS_CONNECTION_CLOSED_USER_ORDERS';
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

export const wsConnectionSuccessAllOrders = () => {
  return {
    type: WS_CONNECTION_SUCCESS_ALL_ORDERS
  };
};

export const wsConnectionErrorAllOrders = () => {
  return {
    type: WS_CONNECTION_ERROR_ALL_ORDERS
  };
};

export const wsConnectionClosedAllOrders = () => {
  return {
    type: WS_CONNECTION_CLOSED_ALL_ORDERS
  };
};

export const wsGetAllOrders = () => {
  return {
    type: WS_GET_ALL_ORDERS
  };
};

/* ----------------------------------- */

export const wsConnectionSuccessUserOrders = () => {
  return {
    type: WS_CONNECTION_SUCCESS_USER_ORDERS
  };
};

export const wsConnectionErrorUserOrders = () => {
  return {
    type: WS_CONNECTION_ERROR_USER_ORDERS
  };
};

export const wsConnectionClosedUserOrders = () => {
  return {
    type: WS_CONNECTION_CLOSED_USER_ORDERS
  };
};

export const wsGetUserOrders = () => {
  return {
    type: WS_GET_USER_ORDERS
  };
};