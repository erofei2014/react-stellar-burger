import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { getIngredients } from "../../services/actions/burger-ingredients";
import { getBurgerIngredients } from "../../services/selectors/burger-ingredients";
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home';
import Login from "../../pages/login";
import Register from "../../pages/register";
import ForgotPassword from "../../pages/forgot-password";
import ResetPassword from "../../pages/reset-password";
import Profile from "../../pages/profile/profile";
import ProfileUpdate from "../../pages/profile/profile-update";
import ProfileOrderHistory from "../../pages/profile/profile-order-history";
import Ingredient from '../../pages/ingredient';
import Modal from '../modal/modal';
import OrderFeed from "../../pages/order-feed";
import OrderInformation from "../../pages/order-information";
import NotFound404 from '../../pages/not-found';
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { checkUserAuth } from "../../services/actions/authentification";

function App() {
  const { ingredientsRequest } = useSelector(getBurgerIngredients);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {!ingredientsRequest &&
        <>
          <Routes location={background || location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
            <Route path="/register" element={<OnlyUnAuth component={<Register />} />} />
            <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
            <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
            <Route path="/feed" element={<OrderFeed />} />
            <Route path="/feed/:number" element={<OrderInformation />} />
            <Route path="/profile" element={<OnlyAuth component={<Profile />} />}>
              <Route path="" element={<OnlyAuth component={<ProfileUpdate />} />} />
              <Route path="orders" element={<OnlyAuth component={<ProfileOrderHistory />} />} />
            </Route>
            <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderInformation />} />} />
            <Route path="/ingredients/:id" element={<Ingredient />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>    

          {background && (
            <Routes>
              <Route
                path="/ingredients/:id"
                element={
                  <Modal closeModal={handleModalClose}>
                    <Ingredient />
                  </Modal>
                }
              />
              <Route
                path="/feed/:number"
                element={
                  <Modal closeModal={handleModalClose}>
                    <OrderInformation />
                  </Modal>
                }
              />
              <Route
                path="/profile/orders/:number"
                element={
                  <Modal closeModal={handleModalClose}>
                    <OnlyAuth component={<OrderInformation />} />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      } 
    </>
  );
}

export default App;
