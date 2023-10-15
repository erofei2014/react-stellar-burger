import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorFilling from "../burger-constructor-filling/burger-constructor-filling";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { BurgerConstructorContext } from "../../services/burger-constructor-context";
import { getOrderNumber } from "../../utils/burger-api";
import { getIngredients } from "../../utils/burger-api";

const initialSum = { sum: 0 };
const reset = {type: 'reset'};

function reducer(state, action) {
  switch (action.type) {
    case 'bun':
      return { sum: state.sum + (action.price * 2) };
    case 'sauce':
      return { sum: state.sum + action.price };
    case 'main':
      return { sum: state.sum + action.price };
    case 'reset':
      return initialSum;
    default:
        throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const [sumState, sumDispatcher] = React.useReducer(reducer, initialSum, undefined);
  const [isModalOpened, openModal] = React.useState(false);
  const [orderNumber, setOrderNumber] = React.useState(null);
  const [order, setOrder] = React.useState([]);

  const { orderList, setOrderList } = React.useContext(BurgerConstructorContext);

  const composeOrder = (() => {
    setOrder(() => {
      let order = [];
      orderList.selectedElements.forEach((ingredient) => {
        order.push(ingredient._id);
      });
      return order;
    });
  })

  React.useEffect(() => {
    composeOrder();
    sumDispatcher(reset);
    orderList.selectedElements.forEach(item => {
      sumDispatcher(item);
    });
  }, [sumDispatcher, orderList]);

  const onButtonClick = (() => {
    getOrderNumber(order)
      .then(data => {
        setOrderNumber(data);
        openModal(true);
      })
      .catch(e => {
        setOrderNumber(null);
      });
  });

  const closeModal = (() => {
    openModal(false);
  });

  const bun = React.useMemo(() => orderList.selectedElements.find(element => element.type === 'bun'), [orderList.selectedElements]);

  const fillings = React.useMemo(() => orderList.selectedElements.filter(element => element.type !== 'bun'), [orderList.selectedElements]);

  return (
    <section className={`${styles.section} pl-4`}>
      {orderList.selectedElements.length !== 0 &&
      <>
        <ul className={`${styles.ingredients} mt-25`}>
          <li className="ml-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              thumbnail={bun.image}
              price={bun.price}
            />
          </li>
          <li className={styles.inner_elements}>
            <BurgerConstructorFilling elements={fillings} />
          </li>
          <li className="ml-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              thumbnail={bun.image}
              price={bun.price}
            />
          </li>
        </ul>
        <div className={`${styles.payment} mt-10 mr-4`}>
          <div className={`${styles.sum} mr-10`}>
            <p className="text text_type_digits-medium mr-2">{sumState.sum}</p>
            <CurrencyIcon
              type="primary"
            />
          </div>
          <Button htmlType="button" extraClass={styles.button} onClick={onButtonClick}>Оформить заказ</Button>
        </div>
      </>}
      {isModalOpened &&
      <Modal closeModal={closeModal}>
        <OrderDetails orderNumber={orderNumber} />
      </Modal>}
    </section>
  );  
}

export default BurgerConstructor;