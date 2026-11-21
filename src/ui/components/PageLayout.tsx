import type { ReactNode } from 'react'

export type PageLayoutProps = {
  title: string
  description?: string
  eyebrow?: string
  backAction?: ReactNode
  children: ReactNode
}

export function PageLayout({
  title,
  description,
  eyebrow,
  backAction,
  children,
}: PageLayoutProps) {
  return (
    <div className="ui-page">
      <header className="ui-page__header">
        <div className="ui-page__header-inner">
          <div className="ui-page__brand">富山の地域活動</div>
          {backAction ? <div className="ui-page__back">{backAction}</div> : null}
        </div>
      </header>
      <main className="ui-page__main">
        {eyebrow ? <p className="ui-page__eyebrow">{eyebrow}</p> : null}
        <h1 className="ui-page__title">{title}</h1>
        {description ? <p className="ui-page__description">{description}</p> : null}
        {children}
      </main>
    </div>
  )
}
