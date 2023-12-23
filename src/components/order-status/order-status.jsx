import React from 'react';
import PropTypes from 'prop-types';
import styles from './order-status.module.css';

function OrderStatus({ orders, totalOrders, totalToday }) {
  return(
    <section className={styles.section}>
      <div>
        <ul className={styles.list}>
          <li>
            <h3 className="text text_type_main-medium pb-6">Готовы:</h3>
            <ul className={`${styles.prepared} text text_type_digits-default custom-scroll`}>
              {orders.map((order, index) => {
                return (
                  order.status === 'done' &&
                  <li key={index}>{order.number}</li>
                );
              })}
            </ul>
          </li>
          <li>
            <h3 className="text text_type_main-medium pb-6">В работе:</h3>
            <ul className={`${styles.preparing} text text_type_digits-default custom-scroll`}>
              {orders.map((order, index) => {
                return (
                  order.status !== 'done' &&
                  <li key={index}>{order.number}</li>
                );
              })}
            </ul>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за всё время</h3>
        <p className={`${styles.shadow} text text_type_digits-large`}>{totalOrders.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня</h3>
        <p className={`${styles.shadow} text text_type_digits-large`}>{totalToday.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</p>
      </div>
    </section>
  );
};

OrderStatus.propTypes = {
  orders: PropTypes.array.isRequired,
  totalOrders: PropTypes.number.isRequired,
  totalToday: PropTypes.number.isRequired
};

export default OrderStatus;