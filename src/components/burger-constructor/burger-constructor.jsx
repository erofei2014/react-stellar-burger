import React from "react";
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorFilling from "../burger-constructor-filling/burger-constructor-filling";

function BurgerConstructor({elements}) {
  const [sum, setSum] = React.useState(610);

  const bun = elements.find(element => element.type === 'bun');

  const fillings = elements.filter(element => element.type !== 'bun');

  return (
    <section className={`${styles.section} pl-4`}>
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
          <p className="text text_type_digits-medium mr-2">{sum}</p>
          <CurrencyIcon
            type="primary"
          />
        </div>
        <Button htmlType="button" extraClass={styles.button}>Оформить заказ</Button>
      </div>
    </section>
  );  
}

BurgerConstructor.propTypes = {
  elements: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
}

export default BurgerConstructor;