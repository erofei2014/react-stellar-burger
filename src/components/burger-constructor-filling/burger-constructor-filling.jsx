import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-constructor-filling.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_INGREDIENT } from '../../services/actions/burger-constructor';

function BurgerConstructorFilling({ ingredient, moveCard, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const removeIngredient = (e, ingredient) => {
    e.preventDefault();
    dispatch({
      type: DELETE_INGREDIENT,
      ingredient: ingredient
    })
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'filling',
    item: { ingredient, index },
    collect: monitor => ({
        isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0 : 1;


  const [{ handlerId }, drop] = useDrop({
    accept: 'filling',
    collect: monitor => ({
      handlerId: monitor.getHandlerId()
    }),
    hover(ingredient, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex);
      ingredient.index = hoverIndex;
    }
  });

  drag(drop(ref));

  return (
    <li ref={ref} className={styles.flexible_element} style={{ opacity }} data-handler-id={handlerId} >
      <span id={ingredient.uuid}>
        <DragIcon
          type="primary"
        />
      </span>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={(e) => removeIngredient(e, ingredient)}
      />
    </li>
  );
}

BurgerConstructorFilling.propTypes = {
  ingredient: ingredientPropType.isRequired,
  moveCard: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default BurgerConstructorFilling;