import { Link, NavLink } from 'react-router-dom';
import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={`${styles.header} mt-10`}>
      <nav className={styles.menu}>
        <ul className={styles.submenu}>
          <li className="pl-5 pr-5">
            <NavLink 
              to="/"
              className={styles.link}
            >
              {({isActive}) => (
                <>
                  <BurgerIcon
                    type={isActive ? '' : 'secondary'}
                  />
                  <p
                    className={isActive 
                      ? 'text text_type_main-default ml-2' 
                      : 'text text_type_main-default ml-2 text_color_inactive'}
                  >Конструктор</p>                 
                </>
              )}
            </NavLink>
          </li>
          <li className={` pl-5 pr-5 ml-2`}>
            <NavLink 
              to="/feed" 
              className={styles.link}
            >
              {({isActive}) => (
                <>
                  <ListIcon
                    type={isActive ? '' : 'secondary'}
                  />
                  <p
                    className={isActive 
                      ? 'text text_type_main-default ml-2' 
                      : 'text text_type_main-default ml-2 text_color_inactive'}
                  >Лента заказов</p>                 
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <Link 
          to="/" 
          className={styles.logo}
        >
          <Logo />
        </Link>
        <NavLink 
          to="/profile" 
          className={`${styles.link} ${styles.personal} pl-5 pr-5`}
        >
          {({isActive}) => (
            <>
              <ProfileIcon
                type={isActive ? '' : 'secondary'}
              />
              <p 
                className={isActive 
                  ? 'text text_type_main-default ml-2' 
                  : 'text text_type_main-default ml-2 text_color_inactive'}
              >Личный кабинет</p>            
            </>
          )}
        </NavLink>
      </nav>
    </header>
  );  
}

export default AppHeader;