import React from "react";
import styles from './burger-ingredient-group.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {BUN} from "../../utils/constants";
import {useSelector} from "react-redux";
import {bunBurgerSelector, ingredientsBurgerSelector} from "../../services/selectors/burger";

export default function BurgerIngredientGroup(props) {
  const {title, ingredients} = props;
  const burgerBun = useSelector(bunBurgerSelector)
  const burgerIngredients = useSelector(ingredientsBurgerSelector)
  function calcCount(ingredient) {
    if (ingredient.type === BUN.key) {
      return burgerBun && burgerBun._id === ingredient._id ? 1 : null
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

BurgerIngredientGroup.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
