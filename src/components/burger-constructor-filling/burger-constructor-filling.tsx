import React, { useRef, FC } from 'react';
import { useDispatch } from '../../services/hooks';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';
import styles from "./burger-constructor-filling.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { DELETE_INGREDIENT } from '../../services/actions/burger-constructor';
import { TIngredientWithId, TIngredientWithIndex } from '../../services/types/types';

export type BurgerConstructorFillingProps = {
  ingredient: TIngredientWithId;
  moveCard: (dragIndex: number, hoverIndex: number)=>void;
  index: number;
};

const BurgerConstructorFilling: FC<BurgerConstructorFillingProps> = ({ ingredient, moveCard, index }) => {
  const ref = useRef<null | HTMLLIElement>(null);
  const dispatch = useDispatch();

  const removeIngredient = (ingredient: TIngredientWithId) => {
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
    hover(ingredient: TIngredientWithIndex, monitor: DropTargetMonitor<unknown, unknown>) {
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
      const clientOffset = monitor.getClientOffset()!;
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
        handleClose={() => removeIngredient(ingredient)}
      />
    </li>
  );
};

export default BurgerConstructorFilling;