import React from "react"
import styles from "./ingredient-page.module.css"
import {ingredientsAPI} from "../../services/api/ingredients";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import BurgerIngredientDetails from "../../components/burger-ingredient-details/burger-ingredient-details";
import Modal from "../../components/modal/modal";

export default function IngredientPage() {
  const {data: ingredients} = ingredientsAPI.useGetIngredientsQuery()
  const {ingredientId} = useParams()
  const ingredient = ingredients && ingredients.success ? ingredients.data.find(i => i._id === ingredientId) : null
  const navigate = useNavigate()
  const location = useLocation()
  const background = location.state && location.state.background

  const handleIngredientPopupClose = () => {
    navigate(-1)
  }

  if (!ingredient) {
    return null
  }

  return (
    <>
      {background ? (
        <Modal title={'Детали ингредиента'} onClose={handleIngredientPopupClose}>
          <BurgerIngredientDetails ingredient={ingredient} />
        </Modal>
      ) : (
        <section className={styles.page}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <BurgerIngredientDetails ingredient={ingredient}/>
        </section>
      )}
    </>
  )
}
