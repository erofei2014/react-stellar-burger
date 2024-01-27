import { TIngredientWithId } from "../types/types";

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const UPDATE_INGREDIENTS_LIST = 'UPDATE_INGREDIENTS_LIST';
export const DELETE_INGREDIENTS_LIST = 'DELETE_INGREDIENTS_LIST';

export type TBurgerConstructorActions = 
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TUpdateIngredientsListAction
  | TDeleteIngredientsListAction;

export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredientWithId;
};

export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  readonly ingredient: TIngredientWithId;
};

export type TUpdateIngredientsListAction = {
  readonly type: typeof UPDATE_INGREDIENTS_LIST;
  readonly ingredients: TIngredientWithId[];
};

export type TDeleteIngredientsListAction = {
  readonly type: typeof DELETE_INGREDIENTS_LIST;
};