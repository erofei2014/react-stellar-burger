import PropTypes from 'prop-types';
import styles from './burger-ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientPropType } from "../../utils/prop-types";

function BurgerIngredient({ingredientData, onClick, count}) {
  const fillModal = (() => {
    onClick(ingredientData);
  });

  return (
    <li className={styles.ingredient} onClick={fillModal}>
      <Counter
        count={count}
        size="default"
      />
      <img src={ingredientData.image} className="ml-4 mr-4"></img>
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
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number
};

export default BurgerIngredient;