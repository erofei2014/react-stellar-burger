import { getIngredientsRequest } from "../../utils/burger-api";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient } from "../types/types";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export type TBurgerIngredientsActions = 
  | TGetIngredientsRequestAction
  | TGetIngredientsSuccessAction
  | TGetIngredientsFailedAction;

export type TGetIngredientsRequestAction = {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
};

export type TGetIngredientsSuccessAction = {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
};

export type TGetIngredientsFailedAction = {
  readonly type: typeof GET_INGREDIENTS_FAILED;
};

export const getIngredients: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest().then(res => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      });
    })
    .catch(e => {
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  };
};