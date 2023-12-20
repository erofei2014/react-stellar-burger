import { wsWithRefresh } from "../../utils/burger-api";

export const socketMiddleware = (wsActions) => {
  return store => {
    let socket = null;
    let isWsConnected = false;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { 
        wsInit,
        wsClose,
        onOpen,
        onError,
        onClose,
        onGetOrders
      } = wsActions;

      if (type === wsInit) {
        socket = new WebSocket(payload);
        isWsConnected = true;
      }

      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = async event => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          if (!parsedData.success) {
            const refreshedLink = await wsWithRefresh();
            dispatch({ type: wsInit, payload: refreshedLink });
          }

          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onGetOrders, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });

          if (isWsConnected) {
            window.setTimeout(() => {
              dispatch({ type: wsInit, payload: payload });
            }, 1000);
          }
        };
      }

      if (wsClose && type === wsClose && socket) {
        isWsConnected = false;
        socket.close();
      }

      next(action);
    };
  };
};