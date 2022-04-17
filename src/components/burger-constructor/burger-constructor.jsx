import React, {useContext} from "react";
import {Button, ConstructorElement, CurrencyIcon, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import PropTypes from "prop-types";
import {OrderContext} from "../../services/order-context";
import api from "../../api/api";
import {DATA, ERROR, LOADING, ORDER, SET} from "../../utils/constants";

export default function BurgerConstructor(props) {
  const {popupHandler} = props;
  const {orderState, orderDispatcher} = useContext(OrderContext)

  const makeOrder = () => {
    if (api) {
      orderDispatcher({type: SET + LOADING + ORDER});
      (async () => {
        await api.doAsyncPostRequest(
          'orders',
          {
            ingredients: [orderState.burger.bun, ...orderState.burger.ingredients].map(i => i._id)
          },
          (data) => {
            if (data.success) {
              orderDispatcher({type: SET + DATA + ORDER, payload: data})
              popupHandler(true);
            } else {
              orderDispatcher({type: SET + ERROR + ORDER, payload: 'Ошибка: ' + data.message})
            }
          },
          (err) => {
            orderDispatcher({type: SET + ERROR + ORDER, payload: err.message})
          }
        );
      })();
    }
  }

  return orderState.burger && (
    <section className={`${styles.section} pt-25`}>
      <div className="pr-6">
        {
          orderState.burger.bun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${orderState.burger.bun.name} (верх)`}
            price={orderState.burger.bun.price}
            thumbnail={orderState.burger.bun.image}
          />
        }
      </div>
      <ul className={`${styles.list} pl-4 pr-4`}>
        {
          orderState.burger.ingredients.map((ingredient, index) =>
            (
              <li key={`${ingredient._id}${index}`} className={styles.item}>
                <DragIcon  type={"primary"}/>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            )
          )
        }
      </ul>
      <div className="pr-6">
        {
          orderState.burger.bun &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${orderState.burger.bun.name} (низ)`}
            price={orderState.burger.bun.price}
            thumbnail={orderState.burger.bun.image}
          />
        }
      </div>
      <div className={`${styles.button_container} pt-6 pr-6`}>
        <div className='mr-10'>
          <span className="text text_type_digits-medium mr-2">{orderState.total}</span>
          <CurrencyIcon type="primary" />
        </div>
        {
          orderState.total > 0 &&
          <Button onClick={makeOrder} className="pt-10" type="primary" size="medium">Оформить заказ</Button>
        }
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  popupHandler: PropTypes.func.isRequired,
};
