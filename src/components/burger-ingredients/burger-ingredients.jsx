import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { useModal } from "../../hooks/useModal";
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientBlock from "../burger-ingredient-block/burger-ingredient-block";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Loader from "../loader/loader";
import { getIngredients } from "../../services/actions/burger-ingredients";
import { FILL_INGREDIENT_DATA, EMPTY_INGREDIENT_DATA } from "../../services/actions/ingredient-details";


function BurgerIngredients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(state => state.burgerIngredients);
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();

  const [current, setCurrent] = useState('bun');
  const [refBun, inViewBun] = useInView({ threshold: 0.2 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.7 });
  const [refMain, inViewMain] = useInView({ threshold: 0.3 });

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    inViewBun && setCurrent('bun');
    inViewSauce && setCurrent('sauce');
    inViewMain && setCurrent('main');
  }, [inViewBun, inViewSauce, inViewMain]);

  const onTypeClick = (tab) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({behavior: 'smooth'});
  };
  
  const emptyModal = (() => {
    closeModal();
    dispatch({
      type: EMPTY_INGREDIENT_DATA,
    });
  });

  const fillModal = ((data) => {
    dispatch({
      type: FILL_INGREDIENT_DATA,
      ingredientDetails: data
    });
    openModal();
  });

  return (
    <section className={`${styles.section} pt-10`}>
      {ingredientsRequest && 
      <Loader>
        <p className="text text_type_main-medium">Идёт загрузка ингредиентов...</p>
      </Loader>}
      {ingredientsFailed &&
      <Loader>
        <>
          <p className="text text_type_main-medium">Ошибка загрузки ингредиентов</p>
          <p className="text text_type_main-medium">Попробуйте обновить страницу</p>        
        </>
      </Loader>}
      {!ingredientsRequest &&
        !ingredientsFailed &&
        ingredients.length &&
        <>
          <h1 className={`${styles.header} text text_type_main-large mb-5`}>Соберите бургер</h1>
          <nav className={styles.menu}>
            <Tab value="bun" active={current === 'bun'} onClick={onTypeClick}>Булки</Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={onTypeClick}>Соусы</Tab>
            <Tab value="main" active={current === 'main'} onClick={onTypeClick}>Начинки</Tab>
          </nav>
          <ul className={`${styles.ingredients} custom-scroll`}>
            <li className={styles.type} ref={refBun}>
              <BurgerIngredientBlock group="Булки" type="bun" ingredients={ingredients} fillModal={fillModal} />
            </li>
            <li className={styles.type} ref={refSauce}>
              <BurgerIngredientBlock group="Соусы" type="sauce" ingredients={ingredients} fillModal={fillModal} />
            </li>
            <li className={styles.type} ref={refMain}>
              <BurgerIngredientBlock group="Начинки" type="main" ingredients={ingredients} fillModal={fillModal} />
            </li>
          </ul>        
        </>}
      {isModalOpen &&
      <Modal title="Детали ингредиента" closeModal={emptyModal}>
        <IngredientDetails />
      </Modal>}
    </section>
  );  
}

export default BurgerIngredients;