import React, { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/hooks';
import { getWsConnection } from '../../services/selectors/ws-selector';
import Feed from '../../components/feed/feed';
import { USER_ORDERS_WS_CONNECTION_START, USER_ORDERS_WS_CONNECTION_CLOSE, userOrdersWsGetOrders } from '../../services/actions/wsActions';
import Loader from '../../components/loader/loader';
import { WS_URL_USER_ORDERS } from '../../utils/burger-api';


function ProfileOrderHistory() {
  const dispatch = useDispatch();

  const { userOrdersWsConnected, userOrders } = useSelector(getWsConnection);

  useEffect(() => {
    if(!userOrdersWsConnected) {
      const accessToken = localStorage.getItem('accessToken');
      dispatch({ 
        type: USER_ORDERS_WS_CONNECTION_START,
        payload: `${WS_URL_USER_ORDERS}?token=${accessToken?.split(' ')[1]}`
      })
    } else {
      dispatch(userOrdersWsGetOrders);
    }

    return () => {
      dispatch({ type: USER_ORDERS_WS_CONNECTION_CLOSE });
    };
  }, [dispatch]);

  return (
    <>
      {!userOrdersWsConnected &&
        <Loader>Загружаем данные о заказах...</Loader>
      }
      {userOrdersWsConnected && userOrders.length !== 0 &&
        <Feed showStatus={true} orders={userOrders} />
      }
    </>
  );
};

export default ProfileOrderHistory;