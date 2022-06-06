import React from "react";
import styles from './burger-ingredient-item.module.css';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";
import {useDispatch} from "react-redux";
import {useDrag} from "react-dnd";
import {setSelected} from "../../services/slices/ingredients";
import {useNavigate} from "react-router-dom";

export default function BurgerIngredientItem(props) {
  const {ingredient, count} = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleIngredientClick = () => {
    dispatch(setSelected(ingredient))
    navigate(`/ingredients/${ingredient._id}`, {
      state: {background: true},
      replace: false,
    })
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: "ingredients",
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    <article ref={dragRef} onClick={handleIngredientClick} className={`${styles.item} ${isDrag && styles.dragging}`}>
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
