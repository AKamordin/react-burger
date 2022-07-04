import React, {FC, MutableRefObject, useRef} from "react";
import styles from "./burger-constructor-item.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DropTargetMonitor, useDrag, useDrop} from "react-dnd";
import {deleteIngredient, sortIngredient} from "../../services/slices/burger";
import {TBurgerConstructorItem} from "../../services/types/components";
import {useAppDispatch} from "../../hooks";

const BurgerConstructorItem: FC<TBurgerConstructorItem> = ({ingredient, index}) => {
  const dispatch = useAppDispatch()
  const ref: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement>(null);

  const handleDelete = (idx: number) => {
    dispatch(deleteIngredient(idx))
  }

  const [{ isDragging }, dragRef] = useDrag({
    type: "draggable-ingredient",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isHover }, dropRef] = useDrop({
    accept: "draggable-ingredient",
    collect: (monitor: DropTargetMonitor) => ({
      isHover: monitor.isOver()
    }),
    drop(dragObject: {index: number}) {
      if (dragObject.index === index) {
        return
      }
      dispatch(sortIngredient({fromIndex: dragObject.index, toIndex: index}))
    }
  })

  dragRef(dropRef(ref))

  return (
    <li ref={ref} className={`${styles.item} ${isDragging && styles.dragging} ${isHover && styles.dropping}`}>
      <DragIcon type={"primary"}/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => handleDelete(index)}
      />
    </li>
  )
}

export default BurgerConstructorItem
