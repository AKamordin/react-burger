import React from "react";
import pagesStyles from "../pages.module.css";

export default function ProfilePage() {
  return (
    <main className={pagesStyles.error}>
      <p className={`text text_type_main-medium text_color_inactive`}>{'Что-то пошло не так :('}</p>
      <p className={`text text_type_main-medium text_color_inactive`}>{'Страница профиля в разработке'}</p>
    </main>
  )
}
