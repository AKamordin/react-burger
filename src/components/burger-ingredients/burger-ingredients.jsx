import React, {useState, useRef, useEffect} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, INGREDIENT_GROUPS, MAIN, SAUCE} from "../../utils/constants";
import BurgerIngredientGroup from "../burger-ingredient-group/burger-ingredient-group";
import {useInView} from "../../hooks/use-in-view";
import {observer} from "mobx-react";
import useStore from "../../hooks/useStore";

function BurgerIngredients() {
  const {ingredientsStore} = useStore()
  const {data} = ingredientsStore
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
    refs[key].current.scrollIntoView({ block: "start", behavior: 'smooth' });
  }

  const bunInView = useInView(bunRef)
  const sauceInView = useInView(sauceRef)
  const mainInView = useInView(mainRef)

  useEffect(() => {
    if (bunInView) {
      setTab(BUN)
    } else if (sauceInView) {
      setTab(SAUCE)
    } else {
      setTab(MAIN)
    }
  }, [bunInView, sauceInView, mainInView])

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
            ingredients={data.filter(i => i.type === BUN.key)}
            title={BUN.value}
          />
        </li>
        <li ref={sauceRef}>
          <BurgerIngredientGroup
            ingredients={data.filter(i => i.type === SAUCE.key)}
            title={SAUCE.value}
          />
        </li>
        <li ref={mainRef}>
          <BurgerIngredientGroup
            ingredients={data.filter(i => i.type === MAIN.key)}
            title={MAIN.value}
          />
        </li>
      </ul>
    </section>
  )
}

export default observer(BurgerIngredients)
