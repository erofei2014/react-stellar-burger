import { useSelector } from 'react-redux';
import styles from './order-details.module.css';
import orderConfirmImage from '../../images/done.png';
import Loader from '../loader/loader';
import { getOrderDetails } from '../../services/selectors/order-details';

function OrderDetails() {
  const { orderNumber, orderNumberRequest, orderNumberFailed } = useSelector(getOrderDetails);

  return (
    <div className={styles.popup}>
      {orderNumberRequest &&
      <Loader>
        <p className="text text_type_main-medium">Загрузка номера заказа...</p>
      </Loader>}
      {orderNumberFailed &&
      <Loader>
        <>
          <p className="text text_type_main-medium">Не удалось обработать заказ</p>
          <p className="text text_type_main-medium">Попробуйте снова</p>
        </>
      </Loader>}      
      {orderNumber !== null && !orderNumberRequest && !orderNumberFailed &&
      <p className={`${styles.order_number} text text_type_digits-large mt-30`}>{orderNumber}</p>}
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={orderConfirmImage} alt="заказ подтверждён" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30 mt-2">Дождитесь готовности на орбитальной станции</p>
  </div>
  );
}

export default OrderDetails;