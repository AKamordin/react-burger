import React from "react";
import styles from './burger-ingredient-group.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {currentOrder} from "../../utils/data";

export default function BurgerIngredientGroup(props) {
  const {title, ingredients, selectIngredientHandler, popupHandler} = props;
  return (
    <section className={`${styles.section} mb-10 custom-scroll`}>
      <h2 className={`${styles.title} mb-6`}>{title}</h2>
      <div className='pr-4 pl-4'>
        <ul className={`${styles.list} custom-scroll`}>
          {
            ingredients.map(ingredient => (
              <li key={ingredient._id}>
                <BurgerIngredientItem
                  ingredient={ingredient}
                  count={currentOrder.filter(t => t._id === ingredient._id).length}
                  selectIngredientHandler={selectIngredientHandler}
                  popupHandler={popupHandler}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

BurgerIngredientGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
  selectIngredientHandler: PropTypes.func.isRequired,
  popupHandler: PropTypes.func.isRequired,
};