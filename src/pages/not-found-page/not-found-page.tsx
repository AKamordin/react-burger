import React, {FC} from "react"
import styles from "./not-found-page.module.css"
import {Link} from "react-router-dom";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";

const NotFoundPage: FC = () => {
  return (
    <article className={styles.container}>
      <p className={`text text_type_digits-large text_color_inactive ${styles.text404}`}>404</p>
      <h1 className="text text_type_main-large">
        Страница не найдена
      </h1>
      <Link className={styles.link} to="/">
        <Button type="primary" size="medium">
          На главную
        </Button>
      </Link>
    </article>
  );
}

export default NotFoundPage
