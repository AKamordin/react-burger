import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import {useDrop} from "react-dnd"
import {BUN, ORDER} from "../../utils/constants"
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"
import {addIngredient, setBun} from "../../services/slices/burger"
import {makeOrder, setTotalOrder} from "../../services/slices/order";
import {setPopup} from "../../services/slices/popup";

export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const order = useSelector(({order}) => order)
  const burger = useSelector(({burger}) => burger)

  const handleMakeOrder = async () => {
    const result = await dispatch(makeOrder([burger.bun, ...burger.ingredients].map(i => i._id)))
    console.log('Result', result)
    if (result.payload && result.payload.success) {
      dispatch(setPopup(ORDER))
    }
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
        dispatch(addIngredient({index: 0, ingredient: dragObj.ingredient}))
      }
    }
  });

  useEffect(() => {
    if (burger.bun) {
      dispatch(setTotalOrder([burger.bun, ...burger.ingredients]))
    } else {
      dispatch(setTotalOrder([...burger.ingredients]))
    }
  }, [dispatch, burger])
  return (
    <section className={`${styles.section} pt-20`}>
      <div ref={dropTarget} className={`${styles.dropArea} ${isHover && styles.droppable} pt-5 pb-5`}>
        <div className="pr-6">
          {
            burger.bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${burger.bun.name} (верх)`}
              price={burger.bun.price}
              thumbnail={burger.bun.image}
            />) : (
              <p className="text text_type_main-large pt-3">Пожалуйста, перенесите сюда булку для создания заказа</p>
            )
          }
        </div>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {
            burger.ingredients.map((ingredient, index) =>
              (
                  <BurgerConstructorItem key={ingredient.uuid} index={index} ingredient={ingredient} />
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
          burger && burger.bun &&
          <Button onClick={handleMakeOrder} className="pt-10" type="primary" size="medium">Оформить заказ</Button>
        }
      </div>
    </section>
  )
}
