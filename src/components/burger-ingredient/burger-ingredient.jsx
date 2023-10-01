import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from "./burger-ingredient.module.css";

function BurgerIngredient({ ingredients, group, type }) {
  return (
    <article className={styles.article} id={type}>
      <h2 className={`${styles.header} text text_type_main-medium mb-6 mt-10`}>{group}</h2>
      <ul className={`${styles.block_of_ingredients} pl-4`}>
        {ingredients.map((ingredient, index) => {
          return (
            ingredient.type === type &&
            <li className={styles.ingredient} key={index}>
              <Counter
                count={1}
                size="default"
              />
              <img src={ingredient.image} className="ml-4 mr-4"></img>
              <div className={`${styles.price} mt-1 mb-1`}>
                <p className="text text_type_digits-default mr-2">{ingredient.price}</p>
                <CurrencyIcon type="primary" />
              </div>
              <p className={`${styles.ingredient_name} text text_type_main-default`}>{ingredient.name}</p>
            </li>
          );
        })}
      </ul>
    </article>
  );  
}

BurgerIngredient.propTypes = {
  ingredients: ingredientPropType.isRequired,
  group: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;