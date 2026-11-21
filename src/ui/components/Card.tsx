import type { HTMLAttributes } from 'react'

export type CardProps = HTMLAttributes<HTMLElement>

export function Card({ className = '', children, ...props }: CardProps) {
  return (
    <section {...props} className={['ui-card', className].filter(Boolean).join(' ')}>
      {children}
    </section>
  )
}
