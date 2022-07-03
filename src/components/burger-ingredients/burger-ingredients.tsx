import React, {useState, useRef, useEffect, MutableRefObject} from "react";
import styles from './burger-ingredients.module.css';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import {BUN, INGREDIENT_GROUPS, MAIN, SAUCE} from "../../utils/constants";
import BurgerIngredientGroup from "../burger-ingredient-group/burger-ingredient-group";
import {useInView} from "../../hooks/useInView";
import {
  bunIngredientsSelector,
  mainIngredientsSelector,
  sauceIngredientsSelector
} from "../../services/selectors/ingredients";
import {useAppSelector} from "../../hooks";

export default function BurgerIngredients() {
  const bunIngredients = useAppSelector(bunIngredientsSelector)
  const sauceIngredients = useAppSelector(sauceIngredientsSelector)
  const mainIngredients = useAppSelector(mainIngredientsSelector)
  const [tab, setTab] = useState<{key: string, value: string}>(BUN)
  const bunRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement>(null);
  const sauceRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement>(null);
  const mainRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement>(null);
  const refs: {[x: string]: MutableRefObject<HTMLLIElement | null>} = {
    [BUN.key]: bunRef,
    [SAUCE.key]: sauceRef,
    [MAIN.key]: mainRef,
  }
  const setCurrentTab = (key: string) => {
    setTab(INGREDIENT_GROUPS.filter(g => g.key === key)[0])
    const currentRef = refs[key]
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ block: "start", behavior: 'smooth' });
    }
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
            ingredients={bunIngredients}
            title={BUN.value}
          />
        </li>
        <li ref={sauceRef}>
          <BurgerIngredientGroup
            ingredients={sauceIngredients}
            title={SAUCE.value}
          />
        </li>
        <li ref={mainRef}>
          <BurgerIngredientGroup
            ingredients={mainIngredients}
            title={MAIN.value}
          />
        </li>
      </ul>
    </section>
  )
}
