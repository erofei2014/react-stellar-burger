import {
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_GET_ORDERS,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_GET_ORDERS
} from '../actions/wsActions';
import { TWsActions } from '../actions/wsActions';
import { TOrder } from '../types/types';

export type TWsReducerState = {
  allOrdersWsConnected: boolean;
  userOrdersWsConnected: boolean;
  totalOrders: null | number;
  totalToday: null | number;
  allOrders: TOrder[] | [];
  userOrders: TOrder[] | [];
};

const initialState: TWsReducerState = {
  allOrdersWsConnected: false,
  userOrdersWsConnected: false,

  totalOrders: null,
  totalToday: null,
  allOrders: [],
  userOrders: []
};

export const wsReducer = (state = initialState, action: TWsActions): TWsReducerState => {
  switch(action.type) {
    case ALL_ORDERS_WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        allOrdersWsConnected: true
      }
    }
    case USER_ORDERS_WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        userOrdersWsConnected: true
      }
    }
    case ALL_ORDERS_WS_CONNECTION_ERROR: {
      return {
        ...state,
        allOrdersWsConnected: false
      }
    }
    case USER_ORDERS_WS_CONNECTION_ERROR: {
      return {
        ...state,
        userOrdersWsConnected: false
      }
    }
    case ALL_ORDERS_WS_CONNECTION_CLOSED: {
      return {
        ...state,
        totalOrders: null,
        totalToday: null,
        allOrders: [],
        allOrdersWsConnected: false
      }
    }
    case USER_ORDERS_WS_CONNECTION_CLOSED: {
      return {
        ...state,
        userOrders: [],
        userOrdersWsConnected: false
      }
    }
    case ALL_ORDERS_WS_GET_ORDERS: {
      return {
        ...state,
        totalOrders: action.payload.total,
        totalToday: action.payload.totalToday,
        allOrders: action.payload.orders
      }
    }
    case USER_ORDERS_WS_GET_ORDERS: {
      return {
        ...state,
        userOrders: action.payload.orders
      }
    }
    default: {
      return state;
    }
  }
};