import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-constructor-filling.module.css";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructorFilling({ elements }) {
  return (
    <ul className={`${styles.flexible_elements} custom-scroll`}>
      {elements.map((element, index) => {
        return (
          <li className={styles.flexible_element} key={index}>
            <DragIcon
              type="primary"
            />
            <ConstructorElement
              isLocked={false}
              text={element.name}
              thumbnail={element.image}
              price={element.price}
            />
          </li>
        );
      })}
    </ul>
  );
}

BurgerConstructorFilling.propTypes = {
  elements: ingredientPropType.isRequired,
}

export default BurgerConstructorFilling;