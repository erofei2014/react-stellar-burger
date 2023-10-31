import { getOrderNumberRequest } from "../../utils/burger-api";
import { DELETE_INGREDIENTS_LIST } from "./burger-constructor";

export const GET_ORDER_NUMBER_REQUEST = 'GET_ORDER_NUMBER_REQUEST';
export const GET_ORDER_NUMBER_SUCCESS = 'GET_ORDER_NUMBER_SUCCESS';
export const GET_ORDER_NUMBER_FAILED = 'GET_ORDER_NUMBER_FAILED';

export function getOrderNumber(orderElements) {
  return function(dispatch) {
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
}