import React, {FC} from "react";
import styles from './burger-ingredient-group.module.css';
import BurgerIngredientItem from "../burger-ingredient-item/burger-ingredient-item";
import {BUN} from "../../utils/constants";
import {bunBurgerSelector, ingredientsBurgerSelector} from "../../services/selectors/burger";
import {Link, useLocation} from "react-router-dom";
import {TBurgerIngredientGroup} from "../../services/types/components";
import {IIngredient} from "../../services/types/ingredients";
import {useAppSelector} from "../../hooks";

const BurgerIngredientGroup: FC<TBurgerIngredientGroup> = ({title, ingredients}) => {
  const burgerBun: IIngredient | null = useAppSelector(bunBurgerSelector)
  const burgerIngredients: IIngredient[] = useAppSelector(ingredientsBurgerSelector)
  const location = useLocation()
  const calcCount = (ingredient: IIngredient) => {
    if (ingredient.type === BUN.key) {
      return burgerBun && burgerBun._id === ingredient._id ? 1 : null
    } else {
      const len = burgerIngredients.filter(t => t._id === ingredient._id).length
      return len === 0 ? null : len
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
                <Link className={`${styles.link}`}
                  to={`/ingredients/${ingredient._id}`}
                  state={{background: location}}
                >
                  <BurgerIngredientItem
                    ingredient={ingredient}
                    count={calcCount(ingredient)}
                  />
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}

export default BurgerIngredientGroup
