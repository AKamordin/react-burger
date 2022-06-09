import { useState, useCallback } from 'react'

export default function useFormData() {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [valid, setValid] = useState(false)
  const [changed, setChanged] = useState(false)

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name = e.target.name
    setValues({...values, [name]: value})
    setErrors({...errors, [name]: e.target.validationMessage})
    setValid(e.target.closest('form').checkValidity())
    setChanged(true)
  }

  const resetForm = useCallback(
    () => {
      setValues({})
      setErrors({})
      setValid(false)
      setChanged(false)
    },
    [setValues, setErrors, setValid, setChanged]
  )

  return {
    values,
    errors,
    valid,
    changed,
    handleChange,
    resetForm,
    setValues,
    setValid,
    setChanged,
  }
}
