import React, { useCallback } from 'react';
import { useDispatch } from '../../../services/hooks';
import styles from './profile.module.css';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { logout } from '../../../services/actions/authentication';
import { PATH_PROFILE, PATH_PROFILE_FEED } from '../../../components/app/app';

function Profile() {
  const dispatch = useDispatch();

  const location = useLocation();

  const onClick = useCallback(e => {
    dispatch(logout());
  }, []);

  return(
    <div className={`${styles.container} ${styles.margin_top} pl-5`}>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          <li className={styles.menu_element}>
            <NavLink
              to={PATH_PROFILE} end
              className={({isActive}) => isActive 
                ? `text text_type_main-medium ${styles.link} ${styles.active_link}` 
                : `text text_type_main-medium text_color_inactive ${styles.link}`}
            >Профиль
            </NavLink>
          </li>
          <li className={styles.menu_element}>
            <NavLink
              to={PATH_PROFILE_FEED}
              className={({isActive}) => isActive 
                ? `text text_type_main-medium ${styles.link} ${styles.active_link}` 
                : `text text_type_main-medium text_color_inactive ${styles.link}`}       
            >История заказов
            </NavLink>
          </li>
          <li className={styles.menu_element}>
            <button
              className={`text text_type_main-medium text_color_inactive ${styles.button}`}
              onClick={onClick}
            >Выход
            </button>
          </li>
        </ul>
        <>
          {location.pathname === PATH_PROFILE &&
            <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.caption}`}>В этом разделе вы можете <br/> изменить свои персональные данные</p>}
          {location.pathname === `${PATH_PROFILE}/${PATH_PROFILE_FEED}` &&
            <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.caption}`}>В этом разделе вы можете <br/> просмотреть свою историю заказов</p>}        
        </>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;