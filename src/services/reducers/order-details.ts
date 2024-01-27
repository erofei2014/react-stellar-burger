import {
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_FAILED,
  GET_ORDER_INFORMATION_REQUEST,
  GET_ORDER_INFORMATION_SUCCESS,
  GET_ORDER_INFORMATION_FAILED
} from '../actions/order-details';
import { TOrderDetailsActions } from '../actions/order-details';
import { TOrder } from '../types/types';

export type TOrderDetailsState = {
  orderNumber: null | number;
  orderInformation: TOrder | null;
  orderNumberRequest: boolean;
  orderNumberFailed: boolean;
  orderInformationRequest: boolean;
  orderInformationFailed: boolean;
};

const initialState: TOrderDetailsState = {
  orderNumber: null,
  orderInformation: null,

  orderNumberRequest: false,
  orderNumberFailed: false,

  orderInformationRequest: false,
  orderInformationFailed: false
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsActions): TOrderDetailsState => {
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
        orderInformation: null,
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
        orderInformation: null    
      }
    }
    default: {
      return state;
    }
  }
};