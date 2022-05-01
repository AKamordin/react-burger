import React, {useRef} from "react";
import styles from "./burger-constructor-item.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {ingredientType} from "../../utils/types";
import PropTypes from "prop-types";
import {modelBurger} from "../../models/burger";

export default function BurgerConstructorItem(props) {
  const {ingredient, index} = props
  const ref = useRef()

  const handleDelete = (index) => {
    modelBurger.deleteIngredient(index)
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
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(dragObject) {
      if (dragObject.index === index) {
        return
      }
      modelBurger.sortIngredient({fromIndex: dragObject.index, toIndex: index})
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

BurgerConstructorItem.propTypes = {
  ingredient: ingredientType.isRequired,
  index: PropTypes.number.isRequired,
};
