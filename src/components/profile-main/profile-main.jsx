import React, {useEffect} from "react";
import styles from "./profile-main.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../hooks/useFormData";
import {authAPI} from "../../services/api/auth";
import {useSelector} from "react-redux";
import {emailUserSelector, nameUserSelector} from "../../services/selectors/auth";

export default function ProfileMain() {
  const {changed, values, setValues, valid, handleChange} = useFormData()
  const {name, email, password} = values
  const userName = useSelector(nameUserSelector)
  const userEmail = useSelector(emailUserSelector)
  // eslint-disable-next-line
  const [updateUser, {}] = authAPI.useUpdateUserMutation()

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
  )
}
