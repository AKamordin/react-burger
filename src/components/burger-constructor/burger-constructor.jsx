import React from "react"
import {useDispatch, useSelector} from "react-redux"
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import {useDrop} from "react-dnd"
import {BUN, ORDER} from "../../utils/constants"
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"
import {addIngredient, setBun} from "../../services/slices/burger"
import {setPopup} from "../../services/slices/popup";
import {bunBurgerSelector, ingredientsBurgerSelector, totalSelector} from "../../services/selectors/burger";
import {orderAPI} from "../../services/api/order";
import {isAuthSelector} from "../../services/selectors/auth";
import {useNavigate} from "react-router-dom";

export default function BurgerConstructor() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(isAuthSelector)
  const total = useSelector(totalSelector)
  const bun = useSelector(bunBurgerSelector)
  const ingredients = useSelector(ingredientsBurgerSelector)
  // eslint-disable-next-line
  const [makeOrder, {}] = orderAPI.useMakeOrderMutation()

  const handleMakeOrder = async () => {
    if (isAuth) {
      const {data} = await makeOrder([bun, ...ingredients].map(i => i._id))
      if (data?.success) {
        dispatch(setPopup(ORDER))
      }
    } else {
      navigate("/login", { replace: true })
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
