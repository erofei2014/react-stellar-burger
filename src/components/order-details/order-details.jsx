import styles from './order-details.module.css';
import orderConfirmImage from '../../images/done.png';

function OrderDetails() {
  return (
    <div className={styles.popup}>
      <p className={`${styles.order_number} text text_type_digits-large mt-30`}>034536</p>
      <p className="text text_type_main-medium mt-8 mb-15">идентификатор заказа</p>
      <img src={orderConfirmImage} alt="заказ подтверждён" />
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30 mt-2">Дождитесь готовности на орбитальной станции</p>
  </div>
  );
}

export default OrderDetails;