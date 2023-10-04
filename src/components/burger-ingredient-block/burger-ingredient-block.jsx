import React from "react";
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-ingredient-block.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";

function BurgerIngredientBlock({ ingredients, group, type, fillModal }) {

  return (
    <div className={styles.article} id={type}>
      <h2 className={`${styles.header} text text_type_main-medium mb-6 mt-10`}>{group}</h2>
      <ul className={`${styles.block_of_ingredients} pl-4`}>
        {ingredients.map((ingredient, index) => {
          return (
            ingredient.type === type &&
            <BurgerIngredient
              ingredientData={ingredient}
              key={index}
              onClick={fillModal}
              count={1}
            />
          );
        })}
      </ul>
    </div>
  );  
}

BurgerIngredientBlock.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  group: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  fillModal: PropTypes.func.isRequired
};

export default BurgerIngredientBlock;