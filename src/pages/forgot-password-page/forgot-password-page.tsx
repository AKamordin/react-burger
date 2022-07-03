import React, {FC, FormEvent} from "react"
import styles from "../pages.module.css";
import useFormData from "../../hooks/useFormData"
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {passAPI} from "../../services/api/pass";

const ForgotPasswordPage: FC = () => {
  const {values, setValues, valid, handleChange} = useFormData()
  const {email} = values
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [forgotPassword, {}] = passAPI.useForgotPasswordMutation()

  const handleForgotPassword = async () => {
    const response = await forgotPassword(email as string)
    if ('data' in response && response.data.success) {
      setValues({})
      navigate("/reset-password", {state: {from: '/forgot-password'}})
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    valid && handleForgotPassword()
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} name="forgot-password-form">
        <h1 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h1>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email ? email as string : ''}
            name={"email"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?&nbsp;
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}

export default ForgotPasswordPage
