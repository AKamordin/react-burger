import React from "react"
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import {useDrop} from "react-dnd"
import {BUN} from "../../utils/constants"
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"
import {useStore} from "../../store"
import {v4 as getUUID} from "uuid"
import {observer} from "mobx-react";

function BurgerConstructor() {
  const {orderStore, burgerStore} = useStore()
  const {bun, ingredients, total} = burgerStore

  const handleMakeOrder = () => {
    orderStore.makeOrder([bun, ...ingredients].map(i => i._id)).then()
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(dragObj) {
      if (dragObj.ingredient.type === BUN.key) {
        burgerStore.setBun(dragObj.ingredient)
      } else {
        burgerStore.addIngredient(0, dragObj.ingredient, getUUID())
      }
    }
  });

  return (
    <section className={`${styles.section} pt-20`}>
      <div ref={dropTarget} className={`${styles.dropArea} ${isHover && styles.droppable} pt-5 pb-5`}>
        <div className="pr-6">
          {
            bun ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />) : (
              <p className="text text_type_main-large pt-3">Пожалуйста, перенесите сюда булку для создания заказа</p>
            )
          }
        </div>
        <ul className={`${styles.list} pl-4 pr-4`}>
          {
            ingredients.map((ingredient, index) =>
              (
                  <BurgerConstructorItem key={ingredient.uuid} index={index} ingredient={ingredient} />
              )
            )
          }
        </ul>
        <div className="pr-6">
          {
            bun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          }
        </div>
      </div>
      <div className={`${styles.button_container} pr-6`}>
        <div className='mr-10'>
          <span className="text text_type_digits-medium mr-2">{total}</span>
          <CurrencyIcon type="primary" />
        </div>
        {
          bun &&
          <Button onClick={handleMakeOrder} className="pt-10" type="primary" size="medium">Оформить заказ</Button>
        }
      </div>
    </section>
  )
}

export default observer(BurgerConstructor)
