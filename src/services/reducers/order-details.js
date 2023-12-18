import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_INFORMATION_REQUEST,
  GET_ORDER_INFORMATION_SUCCESS,
  GET_ORDER_INFORMATION_FAILED
} from '../actions/order-details';

const initialState = {
  orderNumber: null,
  orderInformation: {},

  orderNumberRequest: false,
  orderNumberFailed: false,

  orderInformationRequest: false,
  orderInformationFailed: false
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
    case GET_ORDER_INFORMATION_REQUEST: {
      return {
        ...state,
        orderInformation: {},
        orderInformationRequest: true
      }
    }
    case GET_ORDER_INFORMATION_SUCCESS: {
      return {
        ...state,
        orderInformationRequest: false,
        orderInformationFailed: false,
        orderInformation: action.orderInformation
      }
    }
    case GET_ORDER_INFORMATION_FAILED: {
      return {
        ...state,
        orderInformationRequest: false,
        orderInformationFailed: true,
        orderInformation: {}    
      }
    }
    default: {
      return state;
    }
  }
};