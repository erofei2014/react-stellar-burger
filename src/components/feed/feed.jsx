import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './feed.module.css';
import OrderPreview from '../order-preview/order-preview';
import { getWsConnection } from '../../services/selectors/ws-selector';


function Feed({ isProfile }) {
  const { allOrders, userOrders } = useSelector(getWsConnection);

  return(
    <section className={styles.section}>
      <ul className={`${styles.orders} ${isProfile && styles.orders_user} custom-scroll`}>
        {!isProfile &&
        allOrders.orders.map((order, index) => {
          return (
            <OrderPreview key={index} order={order} showStatus={false} />
          );
        })}
        {isProfile &&
        userOrders.orders.map((order, index) => {
          return (
            <OrderPreview key={index} order={order} showStatus={true} />
          );
        })}
      </ul>
    </section>
  );
};


Feed.propTypes = {
  isProfile: PropTypes.bool.isRequired
};

export default Feed;