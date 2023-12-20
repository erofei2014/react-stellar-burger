import React from 'react';
import PropTypes from 'prop-types';
import styles from './feed.module.css';
import OrderPreview from '../order-preview/order-preview';

function Feed({ showStatus, orders }) {

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

Feed.propTypes = {
  showStatus: PropTypes.bool.isRequired,
  orders: PropTypes.array.isRequired
};

export default Feed;