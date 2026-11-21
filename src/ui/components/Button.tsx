import type { ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
  loading?: boolean
}

export function Button({
  variant = 'primary',
  loading = false,
  className = '',
  disabled,
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={['ui-button', `ui-button--${variant}`, className].filter(Boolean).join(' ')}
    >
      {loading ? <span aria-hidden="true">処理中… </span> : null}
      {children}
    </button>
  )
}
