import React from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

export default function BurgerConstructor(props) {
  const {currentOrder} = props;
  const total = currentOrder.reduce((acc, cur) => acc + cur.price, 0)
  return currentOrder && currentOrder.length > 1 && (
    <section className={`${styles.section} pt-25`}>
      <div className="pr-6">
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${currentOrder[0].name} (верх)`}
          price={currentOrder[0].price}
          thumbnail={currentOrder[0].image}
        />
      </div>
      <ul className={`${styles.list} pl-4 pr-4`}>
        {
          currentOrder.map((ingredient, index) => index > 0 && index < currentOrder.length - 1 &&
            (
              <li key={`${ingredient._id}${index}`} className={styles.item}>
                <DragIcon  type={"primary"}/>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            )
          )
        }
      </ul>
      <div className="pr-6">
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${currentOrder[currentOrder.length - 1].name} (низ)`}
          price={currentOrder[currentOrder.length - 1].price}
          thumbnail={currentOrder[currentOrder.length - 1].image}
        />
      </div>
      <div className={`${styles.button_container} pt-6 pr-6`}>
        <div className='mr-10'>
          <span className="text text_type_digits-medium mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button className="pt-10" type="primary" size="medium">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  currentOrder: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
