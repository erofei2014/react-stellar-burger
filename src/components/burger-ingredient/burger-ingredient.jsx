import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from "../../utils/prop-types";

function BurgerIngredient({ingredientData, fillModal}) {
  const { bun, ingredients } = useSelector(store => store.burgerConstructor);

  const [{ opacity }, ref] = useDrag({
    type: 'ingredients',
    item: ingredientData,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const counter = useMemo(() => {
    if (ingredientData.type === 'bun') {
      return bun?._id === ingredientData._id ? 2 : '';
    } else {
      return ingredients.filter(ingredient => ingredient._id === ingredientData._id).length > 0
      ? ingredients.filter(ingredient => ingredient._id === ingredientData._id).length
      : '';
    }
  }, [bun, ingredients]);

  return (
    <li className={styles.ingredient} style={{ opacity }} onClick={() => fillModal(ingredientData)} ref={ref}>
      {counter > 0 &&
      <Counter
        count={counter}
        size="default"
      />}
      <img src={ingredientData.image} className="ml-4 mr-4" alt={ingredientData.name}></img>
      <div className={`${styles.price} mt-1 mb-1`}>
        <p className="text text_type_digits-default mr-2">{ingredientData.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.ingredient_name} text text_type_main-default`}>{ingredientData.name}</p>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired,
  fillModal: PropTypes.func.isRequired
};

export default BurgerIngredient;