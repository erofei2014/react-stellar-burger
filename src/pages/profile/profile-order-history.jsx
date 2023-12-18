import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWsConnection } from '../../services/selectors/ws-selector';
import Feed from '../../components/feed/feed';
import { WS_CONNECTION_START_USER_ORDERS, WS_CONNECTION_CLOSED_USER_ORDERS, wsGetUserOrders } from '../../services/actions/wsActions';
import Loader from '../../components/loader/loader';

function ProfileOrderHistory() {
  const dispatch = useDispatch();

  const { wsConnectedUserOrders, userOrders } = useSelector(getWsConnection);

  useEffect(() => {
    if(!wsConnectedUserOrders) {
      dispatch({ type: WS_CONNECTION_START_USER_ORDERS })
    } else {
      dispatch(wsGetUserOrders);
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_USER_ORDERS });
    };
  }, []);

  return (
    <>
      {!wsConnectedUserOrders &&
        <Loader>Загружаем данные о заказах...</Loader>
      }
      {wsConnectedUserOrders && Object.keys(userOrders).length !== 0 &&
        <Feed isProfile={true} />
      }
    </>
  );
};

export default ProfileOrderHistory;