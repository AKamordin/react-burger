import React, {useContext} from "react";
import styles from './burger-ingredient-group.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {OrderContext} from "../../services/order-context";
import {BUN} from "../../utils/constants";

export default function BurgerIngredientGroup(props) {
  const {title, ingredients, popupHandler} = props;
  const {orderState} = useContext(OrderContext)
  function calcCount(burger, ingredient) {
    if (ingredient.type === BUN.key) {
      return burger.bun && burger.bun._id === ingredient._id ? 1 : null
    } else {
      return burger.ingredients.filter(t => t._id === ingredient._id).length
    }
  }
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
                  count={calcCount(orderState.burger, ingredient)}
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
  popupHandler: PropTypes.func.isRequired,
};
