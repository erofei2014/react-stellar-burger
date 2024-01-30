import { getOrderNumberRequest, getOrderInformationRequest } from "../../utils/burger-api";
import { DELETE_INGREDIENTS_LIST } from "./burger-constructor";
import { AppDispatch, AppThunk } from "../types";
import { TIngredient, TOrder, TUserNewOrder } from "../types/types";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';
export const GET_ORDER_INFORMATION_REQUEST = 'GET_ORDER_INFORMATION_REQUEST';
export const GET_ORDER_INFORMATION_SUCCESS = 'GET_ORDER_INFORMATION_SUCCESS';
export const GET_ORDER_INFORMATION_FAILED = 'GET_ORDER_INFORMATION_FAILED';

export type TOrderDetailsActions = 
  | TGetOrderNumberRequestAction
  | TGetOrderNumberSuccessAction
  | TGetOrderNumberFailedAction
  | TGetOrderInformationRequestAction
  | TGetOrderInformationSuccessAction
  | TGetOrderInformationFailedAction;

export type TGetOrderNumberRequestAction = {
  readonly type: typeof GET_ORDER_NUMBER_REQUEST;
};

export type TGetOrderNumberSuccessAction = {
  readonly type: typeof GET_ORDER_NUMBER_SUCCESS;
  readonly orderNumber: number;
};

export type TGetOrderNumberFailedAction = {
  readonly type: typeof GET_ORDER_NUMBER_FAILED;
};

export type TGetOrderInformationRequestAction = {
  readonly type: typeof GET_ORDER_INFORMATION_REQUEST;
};

export type TGetOrderInformationSuccessAction = {
  readonly type: typeof GET_ORDER_INFORMATION_SUCCESS;
  readonly orderInformation: TOrder;
};

export type TGetOrderInformationFailedAction = {
  readonly type: typeof GET_ORDER_INFORMATION_FAILED;
};

export const getOrderNumber: AppThunk = (orderElements: TUserNewOrder[]) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_NUMBER_REQUEST
    });
    getOrderNumberRequest(orderElements).then(res => {
      dispatch({
        type: GET_ORDER_NUMBER_SUCCESS,
        orderNumber: res.order.number
      });
      dispatch({
        type: DELETE_INGREDIENTS_LIST
      });
    })
    .catch(e => {
      dispatch({
        type: GET_ORDER_NUMBER_FAILED
      });
    });
  };
};

export const getOrderInformation: AppThunk = (orderNumber: number) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_INFORMATION_REQUEST
    });
    getOrderInformationRequest(orderNumber).then(res => {
      dispatch({
        type: GET_ORDER_INFORMATION_SUCCESS,
        orderInformation: res.orders[0]
      });
    })
    .catch(e => {
      dispatch({
        type: GET_ORDER_INFORMATION_FAILED
      });
    });
  };
}