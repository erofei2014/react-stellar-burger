import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from "./middleware/socketMiddleware";
import {
  ALL_ORDERS_WS_CONNECTION_START,
  ALL_ORDERS_WS_CONNECTION_ERROR,
  ALL_ORDERS_WS_CONNECTION_CLOSE,
  ALL_ORDERS_WS_CONNECTION_CLOSED,
  ALL_ORDERS_WS_CONNECTION_SUCCESS,
  ALL_ORDERS_WS_GET_ORDERS,
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_CLOSE,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_SUCCESS,
  USER_ORDERS_WS_GET_ORDERS
} from './actions/wsActions';

const allOrdersWsActions = {
  wsInit: ALL_ORDERS_WS_CONNECTION_START,
  wsClose: ALL_ORDERS_WS_CONNECTION_CLOSE,
  onOpen: ALL_ORDERS_WS_CONNECTION_SUCCESS,
  onError: ALL_ORDERS_WS_CONNECTION_ERROR,
  onClose: ALL_ORDERS_WS_CONNECTION_CLOSED,
  onGetOrders: ALL_ORDERS_WS_GET_ORDERS
};

const userOrdersWsActions = {
  wsInit: USER_ORDERS_WS_CONNECTION_START,
  wsClose: USER_ORDERS_WS_CONNECTION_CLOSE,
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS,
  onError: USER_ORDERS_WS_CONNECTION_ERROR,
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED,
  onGetOrders: USER_ORDERS_WS_GET_ORDERS
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk, 
  socketMiddleware(allOrdersWsActions),
  socketMiddleware(userOrdersWsActions)
));

export const store = createStore(rootReducer, enhancer);