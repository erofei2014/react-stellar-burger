import React, { useEffect } from "react";
import { useDispatch, useSelector } from '../../services/hooks';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { getIngredients } from "../../services/actions/burger-ingredients";
import { getBurgerIngredients } from "../../services/selectors/burger-ingredients";
import AppHeader from '../app-header/app-header';
import HomePage from '../../pages/home-page/home';
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile/profile";
import ProfileUpdate from "../../pages/profile/profile-update/profile-update";
import ProfileOrderHistory from "../../pages/profile/profile-order-history/profile-order-history";
import Ingredient from '../../pages/ingredient/ingredient';
import Modal from '../modal/modal';
import OrderFeed from "../../pages/order-feed/order-feed";
import OrderInformation from "../../pages/order-information/order-information";
import NotFound404 from '../../pages/not-found/not-found';
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import { checkUserAuth } from "../../services/actions/authentication";

export const PATH_HOME = '/';
export const PATH_LOGIN = '/login';
export const PATH_REGISTER = '/register';
export const PATH_FORGOT_PASSWORD = '/forgot-password';
export const PATH_RESET_PASSWORD = '/reset-password';
export const PATH_FEED = '/feed';
export const PATH_FEED_ORDER = '/feed/:number';
export const PATH_PROFILE = '/profile';
export const PATH_PROFILE_FEED = 'orders';
export const PATH_PROFILE_ORDER = '/profile/orders/:number';
export const PATH_INGREDIENT_DETAILS = '/ingredients/:id';
export const PATH_NOT_FOUND = '*';
export const PATH_SAME_PAGE = '';

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
            <Route path={PATH_HOME} element={<HomePage />} />
            <Route path={PATH_LOGIN} element={<OnlyUnAuth component={<Login />} />} />
            <Route path={PATH_REGISTER} element={<OnlyUnAuth component={<Register />} />} />
            <Route path={PATH_FORGOT_PASSWORD} element={<OnlyUnAuth component={<ForgotPassword />} />} />
            <Route path={PATH_RESET_PASSWORD} element={<OnlyUnAuth component={<ResetPassword />} />} />
            <Route path={PATH_FEED} element={<OrderFeed />} />
            <Route path={PATH_FEED_ORDER} element={<OrderInformation />} />
            <Route path={PATH_PROFILE} element={<OnlyAuth component={<Profile />} />}>
              <Route path={PATH_SAME_PAGE} element={<OnlyAuth component={<ProfileUpdate />} />} />
              <Route path={PATH_PROFILE_FEED} element={<OnlyAuth component={<ProfileOrderHistory />} />} />
            </Route>
            <Route path={PATH_PROFILE_ORDER} element={<OnlyAuth component={<OrderInformation />} />} />
            <Route path={PATH_INGREDIENT_DETAILS} element={<Ingredient />} />
            <Route path={PATH_NOT_FOUND} element={<NotFound404 />} />
          </Routes>    

          {background && (
            <Routes>
              <Route
                path={PATH_INGREDIENT_DETAILS}
                element={
                  <Modal closeModal={handleModalClose}>
                    <Ingredient />
                  </Modal>
                }
              />
              <Route
                path={PATH_FEED_ORDER}
                element={
                  <Modal closeModal={handleModalClose}>
                    <OrderInformation />
                  </Modal>
                }
              />
              <Route
                path={PATH_PROFILE_ORDER}
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
