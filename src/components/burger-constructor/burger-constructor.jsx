import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import {makeOrder, setTotalOrder} from "../../services/actions/order";
import {addIngredient, setBun} from "../../services/actions/burger";
import {useDrop} from "react-dnd";
import {BUN} from "../../utils/constants";
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";

export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const order = useSelector(({order}) => order)
  const burger = useSelector(({burger}) => burger)

  const handleMakeOrder = () => {
    dispatch(makeOrder([burger.bun, ...burger.ingredients].map(i => i._id)))
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(dragObj) {
      if (dragObj.ingredient.type === BUN.key) {
        dispatch(setBun(dragObj.ingredient))
      } else {
        dispatch(addIngredient(0, dragObj.ingredient))
      }
    }
  });

  useEffect(() => {
    if (burger && burger.bun) {
      dispatch(setTotalOrder([burger.bun, ...burger.ingredients]))
    }
  }, [dispatch, burger])
  return (
    <section className={`${styles.section} pt-20`}>
      <div ref={dropTarget} className={`${styles.dropArea} ${isHover && styles.droppable} pt-5 pb-5`}>
        <div className="pr-6">
          {
            burger.bun &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${burger.bun.name} (верх)`}
              price={burger.bun.price}
              thumbnail={burger.bun.image}
            />
          }
        </div>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {
            burger.ingredients.map((ingredient, index) =>
              (
                <BurgerConstructorItem index={index} ingredient={ingredient} />
              )
            )
          }
        </ul>
        <div className="pr-6">
          {
            burger.bun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${burger.bun.name} (низ)`}
              price={burger.bun.price}
              thumbnail={burger.bun.image}
            />
          }
        </div>
      </div>
      <div className={`${styles.button_container} pr-6`}>
        <div className='mr-10'>
          <span className="text text_type_digits-medium mr-2">{order.total}</span>
          <CurrencyIcon type="primary" />
        </div>
        {
          order.total > 0 &&
          <Button onClick={handleMakeOrder} className="pt-10" type="primary" size="medium">Оформить заказ</Button>
        }
      </div>
    </section>
  )
}
