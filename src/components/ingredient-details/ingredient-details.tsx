import React, { type FC } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../services/types/types';

export type TIngredientDetails = {
  ingredientDetails: TIngredient;
};

const IngredientDetails: FC<TIngredientDetails> = ({ ingredientDetails }) => {
  const location = useLocation();
  const background = location.state && location.state.background;

  const headerClass = !background ? `${styles.header_page} text text_type_main-large` : `${styles.header_modal} text text_type_main-large`;

  return (
    <div className={styles.ingredient_container}>
      <h3 className={headerClass}>Детали ингредиента</h3>
      <img src={ingredientDetails.image_large} alt={ingredientDetails.name} />
      <h4 className={`${styles.ingredient_title} text text_type_main-medium mt-4 mb-8`}>{ingredientDetails.name}</h4>
      <ul className={`${styles.ingredient_details} text text_color_inactive`}>
        <li className={styles.composition_element}>
          <p className={`${styles.paragraph} text_type_main-default`}>Калории,ккал</p>
          <p className={`${styles.paragraph} text_type_digits-default`}>{ingredientDetails.calories}</p>
        </li>
        <li className={styles.composition_element}>
          <p className={`${styles.paragraph} text_type_main-default`}>Белки, г</p>
          <p className={`${styles.paragraph} text_type_digits-default`}>{ingredientDetails.proteins}</p>
        </li>
        <li className={styles.composition_element}>
          <p className={`${styles.paragraph} text_type_main-default`}>Жиры, г</p>
          <p className={`${styles.paragraph} text_type_digits-default`}>{ingredientDetails.fat}</p>
        </li>
        <li className={styles.composition_element}>
          <p className={`${styles.paragraph} text_type_main-default`}>Углеводы, г</p>
          <p className={`${styles.paragraph} text_type_digits-default`}>{ingredientDetails.carbohydrates}</p>
        </li>
      </ul>
  </div>
  );
};

export default IngredientDetails;