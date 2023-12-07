import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './burger-constructor';
import { burgerIngredientsReducer } from './burger-ingredients';
import { orderDetailsReducer } from './order-details';
import { authentificationReducer } from './authentification';

export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderDetails: orderDetailsReducer,
  authentification: authentificationReducer
});