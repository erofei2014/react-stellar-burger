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
import { socketMiddleware } from "./services/middleware/socketMiddleware";
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
} from './services/actions/wsActions';

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

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
  thunk, 
  socketMiddleware(allOrdersWsActions),
  socketMiddleware(userOrdersWsActions)
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
