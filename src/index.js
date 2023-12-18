import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import thunk from 'redux-thunk';
import { socketMiddlewareAllOrders } from "./services/middleware/socketMiddlewareAllOrders";
import { socketMiddlewareUserOrders } from "./services/middleware/socketMiddlewareUserOrders";
import {
  WS_CONNECTION_START_ALL_ORDERS,
  WS_CONNECTION_ERROR_ALL_ORDERS,
  WS_CONNECTION_CLOSED_ALL_ORDERS,
  WS_CONNECTION_SUCCESS_ALL_ORDERS,
  WS_GET_ALL_ORDERS,
  WS_CONNECTION_START_USER_ORDERS,
  WS_CONNECTION_ERROR_USER_ORDERS,
  WS_CONNECTION_CLOSED_USER_ORDERS,
  WS_CONNECTION_SUCCESS_USER_ORDERS,
  WS_GET_USER_ORDERS
} from './services/actions/wsActions';

const wsUrlAllOrders = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlUserOrders = 'wss://norma.nomoreparties.space/orders';

const wsActionsAllOrders = {
  wsInit: WS_CONNECTION_START_ALL_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_ALL_ORDERS,
  onError: WS_CONNECTION_ERROR_ALL_ORDERS,
  onClose: WS_CONNECTION_CLOSED_ALL_ORDERS,
  onGetOrders: WS_GET_ALL_ORDERS
};

const wsActionsUserOrders = {
  wsInit: WS_CONNECTION_START_USER_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_USER_ORDERS,
  onError: WS_CONNECTION_ERROR_USER_ORDERS,
  onClose: WS_CONNECTION_CLOSED_USER_ORDERS,
  onGetOrders: WS_GET_USER_ORDERS
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk, 
  socketMiddlewareAllOrders(wsUrlAllOrders, wsActionsAllOrders), 
  socketMiddlewareUserOrders(wsUrlUserOrders, wsActionsUserOrders)
));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
