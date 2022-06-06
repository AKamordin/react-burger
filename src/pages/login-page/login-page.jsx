import React from "react";
import styles from "../pages.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../hooks/useFormData";
import {authAPI} from "../../services/api/auth";

export default function LoginPage() {
  const {values, setValues, errors, valid, handleChange} = useFormData()
  const {email, password} = values
  const navigate = useNavigate()
  const location = useLocation()
  // eslint-disable-next-line
  const [login, {}] = authAPI.useLoginMutation()

  const handleLogin = async () => {
    const {data} = await login({email, password})
    if (data?.success) {
      setValues({})
      location.state ? navigate(location.state.from) : navigate("/")
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    valid && handleLogin()
  }

  return (
    <section className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
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
            Войти
          </Button>
        </div>
        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы — новый пользователь?&nbsp;
          <Link to={"/register"} className={styles.link}>
            Зарегистрироваться
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?&nbsp;
          <Link to={"/forgot-password"} className={styles.link}>
            Восстановить пароль
          </Link>
        </p>
      </form>
    </section>
  )
}
