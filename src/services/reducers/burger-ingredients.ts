import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';
import { TIngredient } from '../types/types';
import { TBurgerIngredientsActions } from '../actions/burger-ingredients';

export type TBurgerIngredientsState = {
  ingredients: TIngredient[] | null;
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
};

const initialState: TBurgerIngredientsState = {
  ingredients: null,
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action: TBurgerIngredientsActions): TBurgerIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredientsRequest: false,
        ingredientsFailed: false,
        ingredients: action.ingredients
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        ingredients: null,       
        ingredientsFailed: true
      }
    }        
    default: {
      return state;
    }
  }
};