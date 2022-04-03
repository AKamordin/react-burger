import React, {useState} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, INGREDIENT_GROUPS} from "../../utils/constants";
import BurgerIngredientGroup from "../burger-ingredient-group/burger-ingredient-group";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/types";

export default function BurgerIngredients(props) {
  const {ingredients} = props;
  const [tab, setTab] = useState(BUN)
  const setCurrentTab = (key) => {
    setTab(INGREDIENT_GROUPS.filter(g => g.key === key)[0]);
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <ul className={styles.tabs}>
        {
          INGREDIENT_GROUPS.map(g => (
            <li key={g.key}><Tab value={g.key} active={tab.key === g.key} onClick={setCurrentTab}>{g.value}</Tab></li>
          ))
        }
      </ul>
      <div className={`${styles.list} mt-10`}>
          <BurgerIngredientGroup ingredients={ingredients.filter(i => i.type === tab.key)} title={tab.value} />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType.isRequired).isRequired,
};
