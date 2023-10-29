import {
  FILL_INGREDIENT_DATA,
  EMPTY_INGREDIENT_DATA
} from '../actions/ingredient-details';

const initialState = {
  ingredientDetails: {}
};

export const ingredientDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientDetails: action.ingredientDetails
      }
    }
    case EMPTY_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientDetails: {}
      }
    }
    default: {
      return state;
    }
  }
};