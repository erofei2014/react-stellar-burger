import React, { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import { useLocation } from 'react-router-dom';
import styles from './order-card.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getBurgerIngredients } from '../../services/selectors/burger-ingredients';
import { checkOrderStatus } from '../../utils/utils';
import { TOrder } from '../../services/types/types';

export type TOrderCard = {
  order: TOrder;
};

const OrderCard: FC<TOrderCard> = ({ order }: TOrderCard) => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const { ingredients } = useSelector(getBurgerIngredients);

  const orderStatus = useMemo(() => {
    return checkOrderStatus(order.status);
  }, [order]);

  const conatainerClass = !background ? styles.container_page : styles.container_modal;
  const orderNumberClass = !background ? styles.order_number : '';
  const orderStatusClass = order.status === 'done' ? `text text_type_main-default mt-2 mb-15 ${styles.done}` : 'text text_type_main-default mt-2 mb-15';

  const reducedIngredients = useMemo(() => {
    return order.ingredients.reduce((prevVal: {[key: string]: number}, ingredient) => {
      if (!prevVal[ingredient]) {
        prevVal[ingredient] = 1;
      } else {
        prevVal[ingredient] += 1;
      }
      return prevVal;
    }, {});
  }, [order]);

  return(
    <div className={conatainerClass}>
      <p className={`text text_type_digits-default mb-10 ${orderNumberClass}`}>#{order.number}</p>
      <h3 className="text text_type_main-medium">{order.name}</h3>
      <p className={orderStatusClass}>{orderStatus}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={`${styles.ingredients} custom-scroll mb-10`}>
        {Object.keys(reducedIngredients).map((ingredient, index) => {
          return(
            <li
              key={index}
              className={styles.element}
            >
              <div className={styles.title}>
                <div
                className={styles.image}
                style={{
                  backgroundImage: `url(${ingredients?.find(item => item._id === ingredient)?.image})`,
                  zIndex: 1000 - index
                }}
                ></div>
                <p className='text text_type_main-default'>{ingredients?.find(item => item._id === ingredient)?.name}</p>
              </div>
              <div className={`${styles.quantity} pr-6`}>
                <p className='text text_type_digits-default'>
                  {`${reducedIngredients[ingredient]} x ${ingredients?.find(item => item._id === ingredient)?.price}`}
                </p>
                <CurrencyIcon type='primary' />
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.bottom_info}>
        <FormattedDate date={new Date(order.createdAt)} className='text text_type_main-default text_color_inactive' />
        <div className={styles.sum}>
          <p className='text text_type_digits-default'>
            {order.ingredients.reduce((prevVal: any, ingredient) => {
                prevVal = prevVal + ingredients?.find(item => item._id === ingredient)?.price;
                return prevVal;
              }, 0)}
          </p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;