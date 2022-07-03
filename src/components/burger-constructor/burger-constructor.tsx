import React, {FC} from "react"
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css'
import {DropTargetMonitor, useDrop} from "react-dnd"
import {BUN} from "../../utils/constants"
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item"
import {addIngredient, setBun} from "../../services/slices/burger"
import {setPopup} from "../../services/slices/popup";
import {bunBurgerSelector, ingredientsBurgerSelector, totalSelector} from "../../services/selectors/burger";
import {orderAPI} from "../../services/api/order";
import {isAuthSelector} from "../../services/selectors/auth";
import {useNavigate} from "react-router-dom";
import {EPopupType} from "../../services/types/popup";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IIngredient} from "../../services/types/ingredients";

const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth: boolean = useAppSelector(isAuthSelector)
  const total: number = useAppSelector(totalSelector)
  const bun: IIngredient | null = useAppSelector(bunBurgerSelector)
  const ingredients: Array<IIngredient> = useAppSelector(ingredientsBurgerSelector)
  // eslint-disable-next-line
  const [makeOrder, {}] = orderAPI.useMakeOrderMutation()

  const handleMakeOrder = async () => {
    if (isAuth) {
      const ids: ReadonlyArray<string> = bun ? [bun, ...ingredients, bun].map(i => i._id) : ingredients.map(i => i._id)
      const response = await makeOrder(ids)
      if ('data' in response && response.data.success) {
        dispatch(setPopup(EPopupType.order))
      }
    } else {
      navigate("/login", { replace: true })
    }
  }

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredients",
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop(dragObj: {ingredient: IIngredient}) {
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
          <Button onClick={handleMakeOrder} type="primary" size="medium">Оформить заказ</Button>
        }
      </div>
    </section>
  )
}

export default BurgerConstructor
