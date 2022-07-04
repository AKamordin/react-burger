import React, {FC, FormEvent} from "react";
import styles from "../pages.module.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import useFormData from "../../hooks/useFormData";
import {authAPI} from "../../services/api/auth";
import {TLocationState} from "../../services/types";

const LoginPage: FC = () => {
  const {values, setValues, valid, handleChange} = useFormData()
  const {email, password} = values
  const navigate = useNavigate()
  const location = useLocation() as TLocationState
  // eslint-disable-next-line
  const [login, {}] = authAPI.useLoginMutation()

  const handleLogin = async () => {
    const response = await login({email, password})
    if ('data' in response && response.data.success) {
      setValues({})
      location.state ? navigate(location.state.from) : navigate("/")
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    valid && handleLogin()
  }

  return (
    <section className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Вход</h1>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"email"}
            placeholder={"E-mail"}
            value={email ? email as string : ''}
            name={"email"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            value={password ? password as string : ''}
            name={"password"}
            size={"default"}
            type={"password"}
            placeholder={"Пароль"}
            error={false}
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

export default LoginPage
