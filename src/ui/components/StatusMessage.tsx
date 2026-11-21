import type { ReactNode } from 'react'

export type StatusMessageProps = {
  tone: 'info' | 'success' | 'warning' | 'error'
  children: ReactNode
}

const labels: Record<StatusMessageProps['tone'], string> = {
  info: 'お知らせ',
  success: '完了',
  warning: '確認',
  error: 'エラー',
}

export function StatusMessage({ tone, children }: StatusMessageProps) {
  return (
    <div
      className={`ui-status ui-status--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
    >
      <strong className="ui-status__label">{labels[tone]}</strong>
      <div>{children}</div>
    </div>
  )
}
