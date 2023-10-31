import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  UPDATE_INGREDIENTS_LIST,
  DELETE_INGREDIENTS_LIST
} from '../actions/burger-constructor';

const initialState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        bun: action.ingredient.type === 'bun' ? action.ingredient : state.bun,
        ingredients: action.ingredient.type !== 'bun' ? [...state.ingredients, action.ingredient] : state.ingredients
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(ingredient => ingredient.uuid !== action.ingredient.uuid)
      }
    }
    case UPDATE_INGREDIENTS_LIST: {
      return {
        ...state,
        ingredients: action.ingredients
      }
    }
    case DELETE_INGREDIENTS_LIST: {
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    }
    default: {
      return state;
    }
  }
};