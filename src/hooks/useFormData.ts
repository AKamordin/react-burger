import {useState, useCallback, ChangeEvent} from 'react'

interface IFormData {
  [key: string]: string | boolean;
}

export default function useFormData() {
  const [values, setValues] = useState<IFormData>({})
  const [errors, setErrors] = useState<IFormData>({})
  const [valid, setValid] = useState<boolean>(false)
  const [changed, setChanged] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value: string | boolean = e.target.type === "checkbox" ? e.target.checked : e.target.value
    const name: string = e.target.name
    setValues({...values, [name]: value})
    setErrors({...errors, [name]: e.target.validationMessage})
    setValid((e.target.closest('form') as HTMLFormElement).checkValidity())
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
