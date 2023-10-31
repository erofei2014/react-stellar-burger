import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED
} from '../actions/order-details';

const initialState = {
  orderNumber: null,

  orderNumberRequest: false,
  orderNumberFailed: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        orderNumber: null,
        orderNumberRequest: true
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: false,
        orderNumber: action.orderNumber
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        orderNumberRequest: false,
        orderNumberFailed: true,
        orderNumber: null       
      }
    }
    default: {
      return state;
    }
  }
};