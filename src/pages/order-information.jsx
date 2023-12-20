import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderCard from '../components/order-card/order-card';
import { getOrderInformation } from '../services/actions/order-details';
import { getWsConnection } from '../services/selectors/ws-selector';
import { getOrderDetails } from '../services/selectors/order-details';
import Loader from '../components/loader/loader';

function OrderInformation() {
  const dispatch = useDispatch();

  const { number } = useParams();

  const { userOrders, allOrders } = useSelector(getWsConnection);
  const { orderInformation, orderInformationRequest, orderInformationFailed } = useSelector(getOrderDetails);

  const checkWsHasOrder = useMemo(() => {
    if(allOrders.some(order => order.number === Number(number)) || userOrders.some(order => order.number === Number(number))) {
      return true;
    } else {
      return false;
    }
  }, []);

  const orderInformationWs = useMemo(() => {
    if(checkWsHasOrder) {
        return allOrders.find(order => order.number === Number(number)) || userOrders.find(order => order.number === Number(number));
    }
  }, []);

  useEffect(() => {
    if(!checkWsHasOrder) {
      dispatch(getOrderInformation(number));
    }
  }, []);

  return(
    <>
      {orderInformationRequest && !orderInformationFailed &&
        <Loader>
          <p className="text text_type_main-medium">Загружаем информацию о заказе...</p>
        </Loader>
      }
      {!orderInformationRequest && orderInformationFailed &&
        <Loader>
          <p className="text text_type_main-medium">Нет данных о заказе</p>
        </Loader>
      }
      {!checkWsHasOrder && !orderInformationRequest && !orderInformationFailed && Object.keys(orderInformation).length !== 0 &&
        <OrderCard order={orderInformation} />}
      {checkWsHasOrder &&
        <OrderCard order={orderInformationWs} />
      }
    </>
  );
};

export default OrderInformation;