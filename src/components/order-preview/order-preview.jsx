import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './order-preview.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { getBurgerIngredients } from '../../services/selectors/burger-ingredients';

function OrderPreview({ order, showStatus }) {
  const location = useLocation();
  const { ingredients } = useSelector(getBurgerIngredients);

  const orderStatus = useMemo(() => {
    switch (order.status) {
      case 'done':
        return 'Выполнен';
      case 'pending':
        return 'Готовится';
      case 'created':
        return 'Создан';
      default:
        return 'Статус неизвестен';
    }
  }, [order]);

  const orderStatusClass = order.status === 'done' ? `text text_type_main-default mt-2 ${styles.done}` : 'text text_type_main-default mt-2';

  const isAllIngredientsAuthentic = useMemo(() => {
    return order.ingredients.every(ingredient => {
      return ingredients.some(item => item._id === ingredient);
    });
  }, [ingredients, order]);

  return(
    <li>
      { order._id && order.ingredients.length && isAllIngredientsAuthentic && order.number && order.createdAt && order.name && order.status &&
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
            {order.ingredients.length < 6
              ? (order.ingredients.map((ingredient, index) => {
                  return (
                    <li 
                      key={index} 
                      className={styles.image} 
                      style={{
                        backgroundImage: `url(${ingredients.find(item => item._id === ingredient).image})`,
                        zIndex: 1000 - index
                      }}
                    >
                    </li>          
                  );
                }))
            : (order.ingredients.slice(0, 6).map((ingredient, index) => {
                return (
                  <>
                  {index < 5 &&
                    <li 
                    key={index} 
                    className={styles.image} 
                    style={{
                      backgroundImage: `url(${ingredients.find(item => item._id === ingredient).image})`,
                      zIndex: 1000 - index
                    }}
                    >
                    </li>}
                  {index === 5 &&
                    <li 
                    key={index} 
                    className={styles.image} 
                    style={{
                      backgroundImage: `url(${ingredients.find(item => item._id === ingredient).image})`,
                      zIndex: 1000 - index
                    }}
                    >
                      <p className={`${styles.ingredients_counter} text text_type_main-default`}>+{order.ingredients.slice(5).length}</p>
                    </li>}                  
                  </>
                );
              }))
            }
          </ul>
          <div className={styles.sum}>
            <p className="text text_type_digits-default">
              {order.ingredients.reduce((prevVal, ingredient) => {
                prevVal = prevVal + ingredients.find(item => item._id === ingredient).price;
                return prevVal;
              }, 0)}
            </p>
            <CurrencyIcon />
          </div>
        </div>      
      </Link>}
    </li>
  );
};

OrderPreview.propTypes = {
  order: PropTypes.object.isRequired,
  showStatus: PropTypes.bool
};

export default OrderPreview;