import React from "react";
import styles from './burger-ingredient-details.module.css'

export default function BurgerIngredientDetails(props) {
  const {ingredient} = props;
  return (
    <article className={`${styles.container}`}>
      {
        ingredient && ingredient.image &&
        <img width="480" height="240" alt={ingredient.name} src={ingredient.image} />
      }
      {
        ingredient && ingredient.name &&
        <p className="text text_type_main-medium pt-4 pb-8">{ingredient.name}</p>
      }
      <ul className={`${styles.list} pt-8`}>
        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Калории,ккал</span>
          {
            ingredient.calories
          }
        </li>
        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Белки, г</span>
          {
            ingredient.proteins
          }
        </li>
        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Жиры, г</span>
          {
            ingredient.fat
          }
        </li>
        <li className={`${styles.listItem} text text_type_main-default text_color_inactive`}>
          <span>Углеводы, г</span>
          {
            ingredient.carbohydrates
          }
        </li>
      </ul>
    </article>
  )
}
