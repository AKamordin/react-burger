import React, {useEffect} from "react";
import styles from "./profile-page.module.css";
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../hooks/useFormData";
import {authAPI} from "../../services/api/auth";
import {useSelector} from "react-redux";
import {emailUserSelector, nameUserSelector, refreshTokenSelector} from "../../services/selectors/auth";

export default function ProfilePage() {
  const {changed, values, setValues, valid, handleChange} = useFormData()
  const navigate = useNavigate()
  const {name, email, password} = values
  const refreshToken = useSelector(refreshTokenSelector)
  const userName = useSelector(nameUserSelector)
  const userEmail = useSelector(emailUserSelector)
  // eslint-disable-next-line
  const [logout, {}] = authAPI.useLogoutMutation()
  // eslint-disable-next-line
  const [updateUser, {}] = authAPI.useUpdateUserMutation()

  const handleLogout = async () => {
    const {data} = await logout(refreshToken)
    if (data?.success) {
      navigate("/login", { replace: true })
    }
  }

  const handleUpdateUser = async () => {
    await updateUser({name, email})
  }

  const handleReset = (event) => {
    event.preventDefault();
    setValues({
      name: userName,
      email: userEmail,
      password: '',
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    valid && handleUpdateUser()
  }

  useEffect(() => {
    if (userName || userEmail) {
      setValues({
        name: userName,
        email: userEmail,
        password: '',
      })
    }
  }, [userName, userEmail, setValues])

  return (
    <article className={styles.container}>
      <div className={`mr-15 ${styles.menu}`}>
        <nav>
          <ul className={styles.list}>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p className={`text text_type_main-medium ${styles.textColor}`}>
                  Профиль
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile/orders" className={styles.link}>
                <p className={`text text_type_main-medium text_color_inactive`}>
                  История заказов
                </p>
              </Link>
            </li>
            <li className="pt-6 pb-4">
              <Link to="/profile" className={styles.link}>
                <p onClick={handleLogout} className={`text text_type_main-medium text_color_inactive`}>
                  Выход
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        <p className={`text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете &nbsp; изменить свои персональные данные
        </p>
      </div>
      <form name="profile-form" className={styles.form} onSubmit={handleSubmit} noValidate >
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={name || ""}
            name={"name"}
            error={false}
            disabled={false}
            errorText={"Введите корректное значение"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"email"}
            placeholder={"Логин"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={email || ""}
            name={"email"}
            error={false}
            disabled={false}
            errorText={"Введите корректное значение"}
            size={"default"}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"password"}
            placeholder={"Пароль"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={password || ""}
            name={"password"}
            error={false}
            disabled={false}
            errorText={"Введите корректное значение"}
            size={"default"}
          />
        </div>
        {
          valid && changed && (
            <div className={`${styles.buttons}`}>
              <div className={styles.buttonLink} onClick={handleReset}>
                Отмена
              </div>
              <Button type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          )
        }
      </form>
    </article>
  )
}
