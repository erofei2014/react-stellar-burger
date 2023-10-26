import React from "react";
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredient from "../burger-ingredient-block/burger-ingredient-block";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useModal } from "../../hooks/useModal";

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('bun');
  const [ingredientInfo, setIngredientData] = React.useState(null);

  const { isModalOpen, openModal, closeModal } = useModal();

  const onTypeClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({behavior: 'smooth'});
  }
  
  const emptyModal = (() => {
    closeModal();
    setIngredientData(null);
  });

  const fillModal = ((data) => {
    setIngredientData(data);
    openModal();
  });

  return (
    <section className={`${styles.section} pt-10`}>
      <h1 className={`${styles.header} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <nav className={styles.menu}>
        <Tab value="bun" active={current === 'bun'} onClick={onTypeClick}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={onTypeClick}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={onTypeClick}>Начинки</Tab>
      </nav>
      <ul className={`${styles.ingredients} custom-scroll`}>
        <li className={styles.type}>
          <BurgerIngredient group="Булки" type="bun" ingredients={ingredients} fillModal={fillModal} />
        </li>
        <li className={styles.type}>
          <BurgerIngredient group="Соусы" type="sauce" ingredients={ingredients} fillModal={fillModal} />
        </li>
        <li className={styles.type}>
          <BurgerIngredient group="Начинки" type="main" ingredients={ingredients} fillModal={fillModal} />
        </li>
      </ul>   
      {isModalOpen &&
      <Modal title="Детали ингредиента" closeModal={emptyModal}>
        <IngredientDetails ingredientDetails={ingredientInfo} />
      </Modal>}
    </section>
  );  
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired
};

export default BurgerIngredients;