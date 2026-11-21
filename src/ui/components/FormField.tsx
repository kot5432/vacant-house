import type { InputHTMLAttributes } from 'react'
import { useId } from 'react'

export type FormFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> & {
  label: string
  hint?: string
  error?: string
  id?: string
}

export function FormField({
  label,
  hint,
  error,
  id,
  className = '',
  required,
  ...props
}: FormFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = hint ? `${inputId}-hint` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [props['aria-describedby'], hintId, errorId]
    .filter(Boolean)
    .join(' ') || undefined

  return (
    <div className={['ui-field', className].filter(Boolean).join(' ')}>
      <label className="ui-field__label" htmlFor={inputId}>
        {label}{required ? <span className="ui-field__required">（必須）</span> : null}
      </label>
      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="ui-field__input"
      />
      {hint ? <p className="ui-field__hint" id={hintId}>{hint}</p> : null}
      {error ? <p className="ui-field__error" id={errorId}>{error}</p> : null}
    </div>
  )
}
