import React from "react"
import styles from "../pages.module.css"
import {Link, useNavigate} from "react-router-dom"
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components"
import useFormData from "../../hooks/useFormData"
import {authAPI} from "../../services/api/auth";

export default function RegisterPage() {
  const {values, setValues, errors, valid, handleChange} = useFormData()
  const navigate = useNavigate()
  const { name, email, password } = values
  // eslint-disable-next-line
  const [register, {}] = authAPI.useRegisterMutation()

  const handleRegister = async () => {
    const {data} = await register({ name, email, password })
    setValues({})
    if (data?.success) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    valid && handleRegister()
  }

  return (
    <section className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} name="register-form">
        <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            value={name || ""}
            name={"name"}
            error={errors.name}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <EmailInput
            type={"email"}
            placeholder={"E-mail"}
            value={email || ""}
            name={"email"}
            error={errors.email}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <PasswordInput
            value={password || ""}
            name={"password"}
            size={"default"}
            type={"password"}
            placeholder={"Пароль"}
            error={errors.password}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?&nbsp;
          <Link to={"/login"} className={styles.link}>
            Войти
          </Link>
        </p>
      </form>
    </section>
  )
}
