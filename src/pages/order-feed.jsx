import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './order-feed.module.css';
import Feed from '../components/feed/feed';
import OrderStatus from '../components/order-status/order-status';
import { getWsConnection } from '../services/selectors/ws-selector';
import { WS_CONNECTION_CLOSED_ALL_ORDERS, WS_CONNECTION_START_ALL_ORDERS, wsGetAllOrders } from '../services/actions/wsActions';
import Loader from '../components/loader/loader';

function OrderFeed() {
  const dispatch = useDispatch();

  const { wsConnectedAllOrders, allOrders } = useSelector(getWsConnection);

  useEffect(() => {
    if(!wsConnectedAllOrders) {
      dispatch({ type: WS_CONNECTION_START_ALL_ORDERS })
    } else {
      dispatch(wsGetAllOrders);
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_ALL_ORDERS });
    };
  }, []);

  return(
    <>
      {!wsConnectedAllOrders &&
        <Loader className="text text_type_main-medium">Загружаем данные о заказах...</Loader>
      }
      {wsConnectedAllOrders && Object.keys(allOrders).length !== 0 &&
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Лента заказов</h2>
        <div className={styles.container}>
          <Feed isProfile={false} />
          <OrderStatus />
        </div>
      </main>}  
    </>
  );
};

export default OrderFeed;