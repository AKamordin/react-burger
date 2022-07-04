import React, {FC, useMemo} from "react";
import styles from "./order-item.module.css";
import {ITEM_DISPLAY_SIZE, MAX_DISPLAY_ITEMS, statusDone, statusMap, TStatus} from "../../utils/constants";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {allIngredientsSelector} from "../../services/selectors/ingredients";
import {formatOrderDate} from "../../utils/date";
import {TOrderItem} from "../../services/types/components";
import {useAppSelector} from "../../hooks";

const OrderItem: FC<TOrderItem> = ({order, isHistory}) => {
  const ingredients = useAppSelector(allIngredientsSelector)
  const len = order.ingredients ? order.ingredients.length : 0

  const images = useMemo(
    () => order.ingredients.slice(0, MAX_DISPLAY_ITEMS).map(item => ingredients.find(i => i._id === item)?.image_mobile),
    [order.ingredients, ingredients]);

  const total = useMemo(
    () => order.ingredients.reduce((accumulator, item) => {
      const price = ingredients.find(i => i._id === item)?.price;
      accumulator += (!price ? 0 : price)
      return accumulator
    }, 0),
    [order.ingredients, ingredients]
  )

  return (
    <article className={styles.order}>
      <div className={`${styles.title} mb-6`}>
        <p className="text text_type_main-medium">
          {
            `#${order.number}`
          }
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {formatOrderDate(order.createdAt)}
        </p>
      </div>
      <p className="text text_type_main-medium">
        {
          order.name
        }
      </p>
      {
        isHistory &&
        <p className={`mt-2 ${order.status === statusDone.key ? styles.done : ''}`}>
          {
            statusMap[order.status as TStatus]?.name
          }
        </p>
      }
      <div className={`${styles.orderDetails} mt-6`}>
        <div className={`${styles.images}`}>
          <ul className={`${styles.imageList}`}>
            {images.map((image, index) => {
              return (
                <li key={index} style={{left: index * ITEM_DISPLAY_SIZE, zIndex: MAX_DISPLAY_ITEMS - index, position: 'absolute'}}>
                  <div className={styles.imageContainer}>
                    <img className={styles.image} src={image} alt="Burger ingredient" />
                  </div>
                </li>);
            })}
          </ul>
          {
            len > MAX_DISPLAY_ITEMS && (
              <p className={`text text_type_main-default ${styles.fakeImage}`} style={{left: (MAX_DISPLAY_ITEMS - 1) * ITEM_DISPLAY_SIZE}}>
                {
                  `+${len - MAX_DISPLAY_ITEMS}`
                }
              </p>
           )
          }
        </div>
        <div className={styles.total}>
          <p className='text text_type_digits-default mr-2'>
            {total}
          </p>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
    </article>
  )
}
export default OrderItem
