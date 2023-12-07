import React, { useMemo } from "react";
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from "../../utils/prop-types";
import { getBurgerConstructor } from "../../services/selectors/burger-constructor";

function BurgerIngredient({ingredientData}) {
  const { bun, ingredients } = useSelector(getBurgerConstructor);

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

  const location = useLocation();

  const id = ingredientData['_id'];

  return (
    <li className={styles.ingredient} style={{ opacity }} ref={ref}>
      <Link
        key={id}
        to={`/ingredients/${id}`}
        state={{ background: location }}
        className={styles.link}
      >
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
      </Link>
    </li>
  );
}

BurgerIngredient.propTypes = {
  ingredientData: ingredientPropType.isRequired
};

export default BurgerIngredient;