import { Link, NavLink } from 'react-router-dom';
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { PATH_HOME, PATH_FEED, PATH_PROFILE } from '../app/app';

function AppHeader() {
  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.menu}>
        <ul className={styles.submenu}>
          <li className="pl-5 pr-5">
            <NavLink 
              to={PATH_HOME}
              className={styles.link}
            >
              {({isActive}) => (
                isActive ? (
                  <>
                    <BurgerIcon type='primary' />
                    <p className='text text_type_main-default ml-2'>Конструктор</p>                 
                  </>
                ) : (
                  <>
                    <BurgerIcon type='secondary' />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Конструктор</p>                 
                  </>
                )
              )}
            </NavLink>
          </li>
          <li className={` pl-5 pr-5 ml-2`}>
            <NavLink 
              to={PATH_FEED}
              className={styles.link}
            >
              {({isActive}) => (
                isActive ? (
                  <>
                    <ListIcon type='primary' />
                    <p className='text text_type_main-default ml-2'>Лента заказов</p>
                  </>
                ) : (
                  <>
                    <ListIcon type='secondary' />
                    <p className='text text_type_main-default ml-2 text_color_inactive'>Лента заказов</p>
                  </>
                )
              )}
            </NavLink>
          </li>
        </ul>
        <Link 
          to={PATH_HOME} 
          className={styles.logo}
        >
          <Logo />
        </Link>
        <NavLink 
          to={PATH_PROFILE}
          className={`${styles.link} ${styles.personal} pl-5 pr-5`}
        >
          {({isActive}) => (
            isActive ? (
              <>
                <ProfileIcon type='primary' />
                <p className='text text_type_main-default ml-2'>Личный кабинет</p>
              </>
            ) : (
              <>
                <ProfileIcon type='secondary' />
                <p className='text text_type_main-default ml-2 text_color_inactive'>Личный кабинет</p>              
              </>
            )
          )}
        </NavLink>
      </nav>
    </header>
  );  
}

export default AppHeader;