import React, { type FC } from "react";
import styles from "./burger-ingredient-block.module.css";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { TIngredient } from "../../services/types/types";

export type TBurgerIngredientsBlock = {
  ingredients: TIngredient[];
  group: string;
  type: string;
};

const BurgerIngredientBlock: FC<TBurgerIngredientsBlock> = ({ ingredients, group, type }) => {
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
            />
          );
        })}
      </ul>
    </div>
  );  
};

export default BurgerIngredientBlock;