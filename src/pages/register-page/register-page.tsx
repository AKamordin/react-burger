import React, {FC, FormEvent} from "react"
import styles from "../pages.module.css"
import {Link, useNavigate} from "react-router-dom"
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components"
import useFormData from "../../hooks/useFormData"
import {authAPI} from "../../services/api/auth";

const RegisterPage: FC = () => {
  const {values, setValues, valid, handleChange} = useFormData()
  const navigate = useNavigate()
  const { name, email, password } = values
  // eslint-disable-next-line
  const [register, {}] = authAPI.useRegisterMutation()

  const handleRegister = async () => {
    const response = await register({ name, email, password })
    setValues({})
    if ('data' in response && response.data.success) {
      navigate("/")
    } else {
      navigate("/login")
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
            value={name ? name as string : ''}
            name={"name"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
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

export default RegisterPage
