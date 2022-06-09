import React from "react";
import styles from './burger-ingredient-item.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {useDrag} from "react-dnd";

export default function BurgerIngredientItem(props) {
  const {ingredient, count} = props;

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <article ref={dragRef} className={`${styles.item} ${isDrag && styles.dragging}`}>
      {
        count > 0 &&
        <Counter count={count} size="default" />
      }
      <img src={ingredient.image} alt={ingredient.name} className={`${styles.image} mb-1`}/>
      <div className={`${styles.priceContainer} mb-1`}>
        <p className={`${styles.price} text text_type_digits-medium mr-2`}>{ingredient.price}</p>
        <CurrencyIcon type="secondary" />
      </div>
      <h3 className={`${styles.name} text text_type_main-small`}>{ingredient.name}</h3>
    </article>
  )
}

BurgerIngredientItem.propTypes = {
  ingredient: ingredientType.isRequired,
  count: PropTypes.number,
};
