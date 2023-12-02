import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styles from './profile.module.css';
import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../../services/actions/authentification';

function Profile() {
  const dispatch = useDispatch();

  const onClick = useCallback(e => {
    dispatch(logout());
  });

  return(
    <div className={`${styles.container} ${styles.margin_top} pl-5`}>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          <li className={styles.menu_element}>
            <NavLink
              to="/profile" end
              className={({isActive}) => isActive 
                ? `text text_type_main-medium ${styles.link} ${styles.active_link}` 
                : `text text_type_main-medium text_color_inactive ${styles.link}`}
            >Профиль
            </NavLink>
          </li>
          <li className={styles.menu_element}>
            <NavLink
              to="orders"
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
        <p className={`text text_type_main-default text_color_inactive mt-20 ${styles.caption}`}>В этом разделе вы можете <br/> изменить свои персональные данные</p>
      </nav>
      <Outlet />
    </div>
  );
}

export default Profile;