import { useCallback, useRef } from 'react'
import { useScopedMotion } from '../../hooks/useScopedMotion'
import { gsap } from '../../utils/motion/gsap'

export default function AnimatedNumber({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  const scope = useRef<HTMLSpanElement>(null)
  const digits = useRef<HTMLSpanElement>(null)
  const setup = useCallback(() => {
    const counter = { value }
    gsap.from(counter, {
      value: 0,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: scope.current, start: 'top 92%', once: true },
      onUpdate: () => {
        if (digits.current)
          digits.current.textContent = String(Math.round(counter.value))
      },
    })
    return () => {
      if (digits.current) digits.current.textContent = String(value)
    }
  }, [value])
  useScopedMotion(scope, setup)
  return (
    <span ref={scope}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        <span ref={digits}>{value}</span>
        {suffix}
      </span>
    </span>
  )
}
