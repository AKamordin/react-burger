import React, {useMemo} from "react";
import styles from "./order-info.module.css";
import {useSelector} from "react-redux";
import {allIngredientsSelector} from "../../services/selectors/ingredients";
import {statusDone, statusMap} from "../../utils/constants";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {formatOrderDate} from "../../utils/date";
import {orderType} from "../../utils/types";

export default function OrderInfo(props) {
  const {order} = props
  const ingredients = useSelector(allIngredientsSelector)

  const total = useMemo(
    () => order.ingredients.reduce((accumulator, item) => {
      const price = ingredients.find(i => i._id === item)?.price;
      accumulator += (!price ? 0 : price)
      return accumulator
    }, 0),
    [order.ingredients, ingredients]
  )

  const distinctIngredients = order.ingredients.reduce((accumulator, item) => {
    if (!accumulator[item]) {
      const ingredient = ingredients.find(i => i._id === item)
      accumulator[item] = {...ingredient, count: 1}
    } else {
      accumulator[item].count++
    }
    return accumulator
  }, {});

  const ingredientList = Object.values(distinctIngredients)

  return (
    <article className={styles.info}>
      <p className={`mt-10 mb-3 text text_type_main-medium`}>{order.name}</p>
      <p className={`text text_type_main-default ${order.status === statusDone.key ? styles.done : ''}`}>
        {
          statusMap[order.status]?.name
        }
      </p>
      <p className={`mt-15 mb-6 text text_type_main-medium`}>Состав:</p>
      <ul className={`custom-scroll pr-6 mb-10 ${styles.ingredients}`}>
        {
          ingredientList.map(ingredient => (
            <li key={ingredient._id} className={styles.ingredient}>
              <div className={styles.imageContainer}>
                <img className={styles.image} src={ingredient.image_mobile} alt="Burger ingredient" />
              </div>
              <p className="text text_type_main-default">{ingredient.name}</p>
              <div className={styles.currency}>
                <p className="mr-2 text text_type_digits-default"> {ingredient.count} x {ingredient.price}</p>
                <CurrencyIcon type="primary"/>
              </div>
            </li>
          ))
        }
      </ul>

      <div className={styles.total}>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>
        <div className={styles.currency}>
          <p className="mr-2 text text_type_digits-default">{total}</p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </article>
  )
}

OrderInfo.propTypes = {
  order: orderType.isRequired,
}
