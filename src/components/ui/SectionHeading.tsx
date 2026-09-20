import type { ReactNode } from 'react'

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string
  title: string
  accent: string
  children?: ReactNode
}) {
  return (
    <div className="section-heading" data-reveal>
      <span className="section-thread" aria-hidden="true" />
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>
        {title}
        <br />
        <em>{accent}</em>
      </h2>
      {children && <p className="section-description">{children}</p>}
    </div>
  )
}
