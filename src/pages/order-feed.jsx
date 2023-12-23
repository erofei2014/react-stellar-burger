import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './order-feed.module.css';
import Feed from '../components/feed/feed';
import OrderStatus from '../components/order-status/order-status';
import { getWsConnection } from '../services/selectors/ws-selector';
import { ALL_ORDERS_WS_CONNECTION_CLOSE, ALL_ORDERS_WS_CONNECTION_START, allOrdersWsGetOrders } from '../services/actions/wsActions';
import Loader from '../components/loader/loader';
import { WS_URL_ALL_ORDERS } from '../utils/burger-api';

function OrderFeed() {
  const dispatch = useDispatch();

  const { allOrdersWsConnected, allOrders, totalOrders, totalToday } = useSelector(getWsConnection);

  useEffect(() => {
    if(!allOrdersWsConnected) {
      dispatch({ 
        type: ALL_ORDERS_WS_CONNECTION_START,
        payload: `${WS_URL_ALL_ORDERS}`
      })
    } else {
      dispatch(allOrdersWsGetOrders);
    }

    return () => {
      dispatch({ type: ALL_ORDERS_WS_CONNECTION_CLOSE });
    };
  }, []);

  return(
    <>
      {!allOrdersWsConnected &&
        <Loader className="text text_type_main-medium">Загружаем данные о заказах...</Loader>
      }
      {allOrdersWsConnected && allOrders.length !== 0 &&
      <main className={styles.main}>
        <h2 className="text text_type_main-large">Лента заказов</h2>
        <div className={styles.container}>
          <Feed showStatus={false} orders={allOrders} />
          <OrderStatus orders={allOrders} totalOrders={totalOrders} totalToday={totalToday} />
        </div>
      </main>}  
    </>
  );
};

export default OrderFeed;