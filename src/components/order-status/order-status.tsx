import React, { FC } from 'react';
import styles from './order-status.module.css';
import { TOrder } from '../../services/types/types';

export type TOrderStatus = {
  orders: TOrder[];
  totalOrders: number;
  totalToday: number;
};

const OrderStatus: FC<TOrderStatus> = ({ orders, totalOrders, totalToday }: TOrderStatus) => {
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

export default OrderStatus;