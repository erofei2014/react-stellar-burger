import React, { type FC } from 'react';
import styles from './feed.module.css';
import OrderPreview from '../order-preview/order-preview';
import { TOrder } from '../../services/types/types';

export type TFeed = {
  showStatus: boolean;
  orders: TOrder[];
};

const Feed: FC<TFeed> = ({ showStatus, orders }) => {
  return(
    <section className={styles.section}>
      <ul className={`${styles.orders} ${showStatus && styles.orders_user} custom-scroll`}>
        {orders.map((order, index) => {
          return (
            <OrderPreview key={index} order={order} showStatus={showStatus} />
          );
        })}
      </ul>
    </section>
  );
};

export default Feed;