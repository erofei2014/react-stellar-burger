import { TOrder } from "../types/types";

export const ALL_ORDERS_WS_CONNECTION_START = 'ALL_ORDERS_WS_CONNECTION_START';
export const ALL_ORDERS_WS_CONNECTION_SUCCESS = 'ALL_ORDERS_WS_CONNECTION_SUCCESS';
export const ALL_ORDERS_WS_CONNECTION_ERROR = 'ALL_ORDERS_WS_CONNECTION_ERROR';
export const ALL_ORDERS_WS_CONNECTION_CLOSE = 'ALL_ORDERS_WS_CONNECTION_CLOSE';
export const ALL_ORDERS_WS_CONNECTION_CLOSED = 'ALL_ORDERS_WS_CONNECTION_CLOSED';
export const ALL_ORDERS_WS_GET_ORDERS = 'ALL_ORDERS_WS_GET_ORDERS';

export const USER_ORDERS_WS_CONNECTION_START = 'USER_ORDERS_WS_CONNECTION_START';
export const USER_ORDERS_WS_CONNECTION_SUCCESS = 'USER_ORDERS_WS_CONNECTION_SUCCESS';
export const USER_ORDERS_WS_CONNECTION_ERROR = 'USER_ORDERS_WS_CONNECTION_ERROR';
export const USER_ORDERS_WS_CONNECTION_CLOSE = 'USER_ORDERS_WS_CONNECTION_CLOSE';
export const USER_ORDERS_WS_CONNECTION_CLOSED = 'USER_ORDERS_WS_CONNECTION_CLOSED';
export const USER_ORDERS_WS_GET_ORDERS = 'USER_ORDERS_WS_GET_ORDERS';

export type TWsActions = 
  | TAllOrdersWsConnectionStartAction
  | TAllOrdersWsConnectionSuccessAction
  | TAllOrdersWsConnectionErrorAction
  | TAllOrdersWsConnectionCloseAction
  | TAllOrdersWsConnectionClosedAction
  | TAllOrdersWsGetOrdersAction
  | TUserOrdersWsConnectionStartAction
  | TUserOrdersWsConnectionSuccessAction
  | TUserOrdersWsConnectionErrorAction
  | TUserOrdersWsConnectionCloseAction
  | TUserOrdersWsConnectionClosedAction
  | TUserOrdersWsGetOrdersAction;

export type TAllOrdersWsConnectionStartAction = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_START;
};

export type TAllOrdersWsConnectionSuccessAction = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_SUCCESS;
};

export type TAllOrdersWsConnectionErrorAction = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_ERROR;
};

export type TAllOrdersWsConnectionCloseAction = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_CLOSE;
};

export type TAllOrdersWsConnectionClosedAction = {
  readonly type: typeof ALL_ORDERS_WS_CONNECTION_CLOSED;
};

export type TAllOrdersWsGetOrdersAction = {
  readonly type: typeof ALL_ORDERS_WS_GET_ORDERS;
  readonly payload: {
    total: number;
    totalToday: number;
    orders: TOrder[];
  }
};

export type TUserOrdersWsConnectionStartAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_START;
};

export type TUserOrdersWsConnectionSuccessAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_SUCCESS;
};

export type TUserOrdersWsConnectionErrorAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_ERROR;
};

export type TUserOrdersWsConnectionCloseAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSE;
};

export type TUserOrdersWsConnectionClosedAction = {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSED;
};

export type TUserOrdersWsGetOrdersAction = {
  readonly type: typeof USER_ORDERS_WS_GET_ORDERS;
  readonly payload: {
    orders: TOrder[];
  }
};

export const allOrdersWsGetOrders = () => {
  return {
    type: ALL_ORDERS_WS_GET_ORDERS
  };
};

export const userOrdersWsGetOrders = () => {
  return {
    type: USER_ORDERS_WS_GET_ORDERS
  };
};