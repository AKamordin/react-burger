import { useState, useCallback } from 'react'

export default function useFormData() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name
    setValues({...values, [name]: value})
    setErrors({...errors, [name]: e.target.validationMessage})
    setValid(e.target.closest('form').checkValidity())
  }

  const resetForm = useCallback(
    () => {
      setValues({})
      setErrors({})
      setValid(false)
    },
    [setValues, setErrors, setValid]
  )

  return {
    values,
    errors,
    valid,
    handleChange,
    resetForm,
    setValues,
    setValid,
  }
}
