import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.menu}>
        <ul className={styles.submenu}>
          <li className="pl-5 pr-5">
            <a href="#" className={styles.link}>
              <BurgerIcon />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </a>
          </li>
          <li className={` pl-5 pr-5 ml-2`}>
            <a href="#" className={styles.link}>
              <ListIcon
                type="secondary"
              />
              <p className="text text_type_main-default text_color_inactive ml-2">Лента заказов</p>              
            </a>
          </li>
        </ul>
        <a href="#" className={styles.logo}>
          <Logo />
        </a>
        <a href="#" className={`${styles.link} ${styles.personal} pl-5 pr-5`}>
          <ProfileIcon
            type="secondary"
          />
          <p className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</p>          
        </a>
      </nav>
    </header>
  );  
}

export default AppHeader;