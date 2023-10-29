import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { useModal } from "../../hooks/useModal";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorFilling from "../burger-constructor-filling/burger-constructor-filling";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { getOrderNumber } from "../../services/actions/order-details";
import { ADD_INGREDIENT, UPDATE_INGREDIENTS_LIST } from "../../services/actions/burger-constructor";
import bunImage from '../../../src/images/bun.png';

function BurgerConstructor() {
  const uuid = uuidv4();
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector(store => store.burgerConstructor);
  const { isModalOpen, openModal, closeModal } = useModal();

  const compileOrder = () => {
    return [bun._id, ...ingredients.map(ingredient => ingredient._id), bun._id];
  };

  const setOrderNumber = () => {
    if (bun === null || !ingredients.length) {
      return;
    } else {
      dispatch(getOrderNumber(compileOrder()));
      openModal();
    }
  };

  const moveIngredient = (ingredient) => {
    dispatch({
      type: ADD_INGREDIENT,
      ingredient
    });
  };

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredients',
    drop(item) {moveIngredient({...item, uuid: uuid })},
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    ingredients.splice(hoverIndex, 0, ...ingredients.splice(dragIndex, 1));
    dispatch({
      type: UPDATE_INGREDIENTS_LIST,
      ingredients: ingredients
    });
  }, [ingredients]);

  const totalPrice = useMemo(() => {
    const bunPrice = bun === null ? 0 : bun.price * 2;
    const ingredientsPrice = !ingredients.length ? 0 :
     ingredients.reduce((previousValue, ingredient) => {
      return previousValue + ingredient.price;
     }, 0);
    return bunPrice + ingredientsPrice; 
  }, [bun, ingredients])

  return (
    <section ref={dropTarget} className={`${styles.section} pl-4`}>
      <ul className={`${styles.ingredients} mt-25 ${isHover ? styles.onHover : ''}`}>
        {bun === null ?
        (<li className={`${styles.inner_elements_bun} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={'Выберите булку'}
            thumbnail={bunImage}
            price={0}
          />
        </li>) :
        (<li className={`${styles.inner_elements_bun} ml-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            thumbnail={bun.image}
            price={bun.price}
          />
        </li>)}
        {!ingredients.length ?
        (<div className={styles.fillings_substutute}> 
          <p className="text text_type_main-default">Выберите ингредиенты</p>
        </div>) :
        (<li className={styles.inner_elements}>
          <ul className={`${styles.flexible_elements} custom-scroll`}>
            {ingredients.map((ingredient, index) => {
              return (
                <BurgerConstructorFilling ingredient={ingredient} moveCard={moveCard} index={index} key={ingredient.uuid} />
              );
            })}
          </ul>
        </li>)}
        {bun === null ?
        (<li className={`${styles.inner_elements_bun} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={'Выберите булку'}
            thumbnail={bunImage}
            price={0}
          />
        </li>) :
        (<li className={`${styles.inner_elements_bun} ml-8`}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            thumbnail={bun.image}
            price={bun.price}
          />
        </li>)}
      </ul>
      <div className={`${styles.payment} mt-10 mr-4`}>
        <div className={`${styles.sum} mr-10`}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon
            type="primary"
          />
        </div>
        <Button htmlType="button" extraClass={styles.button} onClick={setOrderNumber}>Оформить заказ</Button>
      </div>
      {isModalOpen &&
      <Modal closeModal={closeModal}>
        <OrderDetails />
      </Modal>}
    </section>
  );  
}

export default BurgerConstructor;