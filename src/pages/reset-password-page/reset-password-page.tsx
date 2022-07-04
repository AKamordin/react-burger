import React, {FC, FormEvent} from "react"
import styles from "../pages.module.css";
import useFormData from "../../hooks/useFormData"
import {Link, useNavigate} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {passAPI} from "../../services/api/pass";

const ResetPasswordPage: FC = () => {
  const {values, setValues, valid, handleChange} = useFormData()
  const {password, token} = values
  const navigate = useNavigate()
  // eslint-disable-next-line
  const [resetPassword, {}] = passAPI.useResetPasswordMutation()

  const handleResetPassword = async () => {
    const response = await resetPassword({password: password as string , token: token as string})
    setValues({})
    if ('data' in response && response.data.success) {
      navigate("/", { replace: true })
    } else {
      navigate("/forgot-password", { replace: true })
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    valid && handleResetPassword()
  }

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit} name="login-form">
        <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"password"}
            placeholder={"Введите новый пароль"}
            value={password ? password as string : ''}
            name={"password"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className={`mb-6 ${styles.inputContainer}`}>
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            value={token ? token as string : ''}
            name={"token"}
            error={false}
            errorText={"Введите корректное значение"}
            onChange={handleChange}
          />
        </div>
        <div className="mb-20">
          <Button type="primary" size="medium">
            Сохранить
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

export default ResetPasswordPage
