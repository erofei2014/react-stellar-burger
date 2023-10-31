import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED
} from '../actions/burger-ingredients';

const initialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false
};

export const burgerIngredientsReducer = (state = initialState, action) => {
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
        ingredients: [],       
        ingredientsFailed: true
      }
    }        
    default: {
      return state;
    }
  }
};