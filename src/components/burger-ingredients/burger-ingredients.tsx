import React, { useState, useEffect } from "react";
import { useSelector } from '../../services/hooks';
import { useInView } from 'react-intersection-observer';
import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientBlock from "../burger-ingredient-block/burger-ingredient-block";
import Loader from "../loader/loader";
import { getBurgerIngredients } from "../../services/selectors/burger-ingredients";


function BurgerIngredients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(getBurgerIngredients);

  const [current, setCurrent] = useState('bun');
  const [refBun, inViewBun] = useInView({ threshold: 0.2 });
  const [refSauce, inViewSauce] = useInView({ threshold: 0.7 });
  const [refMain, inViewMain] = useInView({ threshold: 0.3 });

  useEffect(() => {
    inViewBun && setCurrent('bun');
    inViewSauce && setCurrent('sauce');
    inViewMain && setCurrent('main');
  }, [inViewBun, inViewSauce, inViewMain]);

  const onTypeClick = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({behavior: 'smooth'});
  };

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
        ingredients &&
        <>
          <h1 className={`${styles.header} text text_type_main-large mb-5`}>Соберите бургер</h1>
          <nav className={styles.menu}>
            <Tab value="bun" active={current === 'bun'} onClick={onTypeClick}>Булки</Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={onTypeClick}>Соусы</Tab>
            <Tab value="main" active={current === 'main'} onClick={onTypeClick}>Начинки</Tab>
          </nav>
          <ul className={`${styles.ingredients} custom-scroll`}>
            <li className={styles.type} ref={refBun}>
              <BurgerIngredientBlock group="Булки" type="bun" ingredients={ingredients} />
            </li>
            <li className={styles.type} ref={refSauce}>
              <BurgerIngredientBlock group="Соусы" type="sauce" ingredients={ingredients} />
            </li>
            <li className={styles.type} ref={refMain}>
              <BurgerIngredientBlock group="Начинки" type="main" ingredients={ingredients} />
            </li>
          </ul>        
        </>}
    </section>
  );  
}

export default BurgerIngredients;