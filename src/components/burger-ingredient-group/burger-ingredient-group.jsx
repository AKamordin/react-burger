import React from "react";
import styles from './burger-ingredient-group.module.css';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {BUN} from "../../utils/constants";
import {useStore} from "effector-react";
import {modelBurger} from "../../models/burger";

export default function BurgerIngredientGroup(props) {
  const {title, ingredients} = props;
  const bun = useStore(modelBurger.$bun)
  const igs = useStore(modelBurger.$ingredients)
  function calcCount(ingredient) {
    if (ingredient.type === BUN.key) {
      return bun && bun._id === ingredient._id ? 1 : null
    } else {
      return igs.filter(t => t._id === ingredient._id).length
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
