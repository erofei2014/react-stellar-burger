import {
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_USER_ORDERS,
  WS_CONNECTION_ERROR_USER_ORDERS,
  WS_CONNECTION_CLOSED_USER_ORDERS,
  WS_GET_USER_ORDERS
} from '../actions/wsActions';

const initialState = {
  wsConnectedAllOrders: false,
  wsConnectedUserOrders: false,

  allOrders: {},
  userOrders: {}
};

export const wsReducer = (state = initialState, action) => {
  switch(action.type) {
    case WS_CONNECTION_SUCCESS_ALL_ORDERS: {
      return {
        ...state,
        wsConnectedAllOrders: true
      }
    }
    case WS_CONNECTION_ERROR_ALL_ORDERS: {
      return {
        ...state,
        wsConnectedAllOrders: false
      }
    }
    case WS_CONNECTION_CLOSED_ALL_ORDERS: {
      return {
        ...state,
        wsConnectedAllOrders: false
      }
    }
    case WS_GET_ALL_ORDERS: {
      return {
        ...state,
        allOrders: action.payload
      }
    }
    case WS_CONNECTION_SUCCESS_USER_ORDERS: {
      return {
        ...state,
        wsConnectedUserOrders: true
      }
    }
    case WS_CONNECTION_ERROR_USER_ORDERS: {
      return {
        ...state,
        wsConnectedUserOrders: false
      }
    }
    case WS_CONNECTION_CLOSED_USER_ORDERS: {
      return {
        ...state,
        wsConnectedUserOrders: false
      }
    }
    case WS_GET_USER_ORDERS: {
      return {
        ...state,
        userOrders: action.payload
      }
    }
    default: {
      return state;
    }
  }
};