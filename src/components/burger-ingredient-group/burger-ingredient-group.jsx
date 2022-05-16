import React from "react";
import styles from './burger-ingredient-group.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {BUN} from "../../utils/constants";
import {observer} from "mobx-react";
import useStore from "../../hooks/useStore";

function BurgerIngredientGroup(props) {
  const {title, ingredients} = props;
  const {burgerStore} = useStore()
  const {bun, ingredients : burgerIngredients} = burgerStore

  function calcCount(ingredient) {
    if (ingredient.type === BUN.key) {
      return bun && bun._id === ingredient._id ? 1 : null
    } else {
      return burgerIngredients.filter(t => t._id === ingredient._id).length
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
                  count={calcCount(ingredient)}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default observer(BurgerIngredientGroup)

BurgerIngredientGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
