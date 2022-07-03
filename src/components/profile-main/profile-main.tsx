import React, {FC, FormEvent, SyntheticEvent, useEffect} from "react";
import styles from "./profile-main.module.css";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../hooks/useFormData";
import {authAPI} from "../../services/api/auth";
import {emailUserSelector, nameUserSelector} from "../../services/selectors/auth";
import {useAppSelector} from "../../hooks";
import {Loader} from "../loader/loader";

const ProfileMain: FC = () => {
  const {changed, values, setValues, valid, handleChange} = useFormData()
  const {name, email, password} = values
  const userName: string | null = useAppSelector(nameUserSelector)
  const userEmail: string | null = useAppSelector(emailUserSelector)
  const [updateUser, {isLoading}] = authAPI.useUpdateUserMutation()

  const handleUpdateUser = async () => {
    await updateUser({name, email})
  }

  const handleReset = (event: SyntheticEvent<Element, Event>) => {
    event.preventDefault();
    setValues({
      name: userName ? userName : '',
      email: userEmail ? userEmail : '',
      password: '',
    })
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    valid && handleUpdateUser()
  }

  useEffect(() => {
    if (userName || userEmail) {
      setValues({
        name: userName ? userName : '',
        email: userEmail ? userEmail : '',
        password: '',
      })
    }
  }, [userName, userEmail, setValues])

  if (isLoading) {
    return <Loader size={"large"} />
  }

  return (
    <form name="profile-form" className={styles.form} onSubmit={handleSubmit} noValidate >
      <div className={`mb-6 ${styles.inputContainer}`}>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleChange}
          icon={"EditIcon"}
          value={name ? name as string : ''}
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
          value={email ? email as string : ''}
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
          value={password ? password as string : ''}
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

export default ProfileMain
