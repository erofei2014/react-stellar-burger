import React, { FC, useMemo } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './order-preview.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { getBurgerIngredients } from '../../services/selectors/burger-ingredients';
import { checkOrderStatus } from '../../utils/utils';
import { TOrderCard } from '../order-card/order-card';

export type TOrderPreview = TOrderCard & {
  showStatus: boolean;
};

const OrderPreview: FC<TOrderPreview> = ({ order, showStatus }: TOrderPreview) => {
  const location = useLocation();
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderStatus = useMemo(() => {
    return checkOrderStatus(order.status);
  }, [order]);

  const maxVisibleElements = 5;
  
  const orderStatusClass = order.status === 'done' ? `text text_type_main-default mt-2 ${styles.done}` : 'text text_type_main-default mt-2';

  const isAllIngredientsAuthentic = useMemo(() => {
    return order.ingredients.every(ingredient => {
      return ingredients?.some(item => item._id === ingredient);
    });
  }, [ingredients, order]);

  const isOrderValid = order._id && order.ingredients.length && isAllIngredientsAuthentic && order.number && order.createdAt && order.name && order.status;

  return(
    <li>
      { isOrderValid &&
      <Link 
        className={styles.order}
        to={`${order.number}`}
        state={{ background: location }}
      >
        <div className={styles.header}>
          <p className="text text_type_digits-default">#{order.number}</p>
          <FormattedDate 
            date={new Date(order.createdAt)} 
            className="text text_type_main-default text_color_inactive"
          />
        </div>
        <div>
          <h3 className="text text_type_main-medium">{order.name}</h3>
          {showStatus &&
          <p className={orderStatusClass}>{orderStatus}</p>}
        </div>
        <div className={styles.content}>
          <ul className={styles.ingredients}>
            {order.ingredients.slice(0, maxVisibleElements + 1).map((ingredient, index) => {
                return (
                  <li 
                    key={index} 
                    className={styles.image} 
                    style={{
                      backgroundImage: `url(${ingredients?.find(item => item._id === ingredient)?.image})`,
                      zIndex: 1000 - index
                    }}
                  >
                    {index === maxVisibleElements && 
                    <p className={`${styles.ingredients_counter} text text_type_main-default`}>
                      +{order.ingredients.slice(maxVisibleElements).length}
                    </p>}
                  </li>              
                );
              })}
          </ul>
          <div className={styles.sum}>
            <p className="text text_type_digits-default">
              {order.ingredients.reduce((prevVal, ingredient) => {
                prevVal = prevVal + ingredients?.find(item => item._id === ingredient)?.price!;
                return prevVal;
              }, 0)}
            </p>
            <CurrencyIcon type='primary' />
          </div>
        </div>      
      </Link>}
    </li>
  );
};

export default OrderPreview;