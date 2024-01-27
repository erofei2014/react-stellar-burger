import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from '../services/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../components/ingredient-details/ingredient-details';
import { getBurgerIngredients } from '../services/selectors/burger-ingredients';
import { TIngredient } from '../services/types/types';

function Ingredient() {
  const { id } = useParams();
  const { ingredients, ingredientsRequest } = useSelector(getBurgerIngredients);
  const [ingredient, setIngredient] = useState<TIngredient | undefined>();

  const loadIngredientInfo = useCallback(() => {
    setIngredient(ingredients?.find(({ _id }) => _id === id));
    },[id]);

  useEffect(
    () => {
      loadIngredientInfo();
    },
    [id, loadIngredientInfo]
  );

  return (
    <>
      {!ingredientsRequest && ingredient &&
        <IngredientDetails ingredientDetails={ingredient} />
      }    
    </>
  );
};

export default Ingredient;