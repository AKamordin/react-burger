import React, {useState, useRef, useContext} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, INGREDIENT_GROUPS, MAIN, SAUCE} from "../../utils/constants";
import BurgerIngredientGroup from "../burger-ingredient-group/burger-ingredient-group";
import PropTypes from "prop-types";
import {IngredientsContext} from "../../services/ingredients-context";

export default function BurgerIngredients(props) {
  const {popupHandler} = props;
  const {ingredientsState} = useContext(IngredientsContext)
  const [tab, setTab] = useState(BUN)
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const refs = {
    [BUN.key]: bunRef,
    [SAUCE.key]: sauceRef,
    [MAIN.key]: mainRef,
  }
  const setCurrentTab = (key) => {
    setTab(INGREDIENT_GROUPS.filter(g => g.key === key)[0]);
    refs[key].current.scrollIntoView({ behavior: 'smooth' });
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
      <ul className={`${styles.list} mt-10`}>
        <li ref={bunRef}>
          <BurgerIngredientGroup
            ingredients={ingredientsState.data.filter(i => i.type === BUN.key)}
            title={BUN.value}
            popupHandler={popupHandler}
          />
        </li>
        <li ref={sauceRef}>
          <BurgerIngredientGroup
            ingredients={ingredientsState.data.filter(i => i.type === SAUCE.key)}
            title={SAUCE.value}
            popupHandler={popupHandler}
          />
        </li>
        <li ref={mainRef}>
          <BurgerIngredientGroup
            ingredients={ingredientsState.data.filter(i => i.type === MAIN.key)}
            title={MAIN.value}
            popupHandler={popupHandler}
          />
        </li>
      </ul>
    </section>
  )
}

BurgerIngredients.propTypes = {
  popupHandler: PropTypes.func.isRequired,
};
