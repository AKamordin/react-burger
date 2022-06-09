import React from "react"
import styles from "../pages.module.css";
import useFormData from "../../hooks/useFormData"
import {Link, useNavigate} from "react-router-dom";
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {passAPI} from "../../services/api/pass";

export default function ForgotPasswordPage() {
  const {values, setValues, valid, handleChange} = useFormData()
  const {email} = values
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [forgotPassword, {}] = passAPI.useForgotPasswordMutation()

  const handleForgotPassword = async () => {
    const {data} = await forgotPassword(email)
    if (data?.success) {
      setValues({})
      navigate("/reset-password", {state: {from: '/forgot-password'}})
    }
  }

  const handleSubmit = (event) => {
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
          <EmailInput
            type={"email"}
            placeholder={"Укажите e-mail"}
            value={email || ""}
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
