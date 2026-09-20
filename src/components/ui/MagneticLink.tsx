import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference'

type Props = PropsWithChildren<{
  href: string
  variant?: 'primary' | 'light' | 'outline'
  className?: string
}>

export default function MagneticLink({
  href,
  children,
  variant = 'primary',
  className = '',
}: Props) {
  const reduced = useReducedMotionPreference()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 22 })
  const springY = useSpring(y, { stiffness: 220, damping: 22 })
  return (
    <motion.a
      href={href}
      className={'button button--' + variant + ' ' + className}
      style={{ x: reduced ? 0 : springX, y: reduced ? 0 : springY }}
      onPointerMove={(event) => {
        if (
          reduced ||
          event.pointerType !== 'mouse' ||
          !matchMedia('(pointer: fine)').matches
        )
          return
        const rect = event.currentTarget.getBoundingClientRect()
        x.set((event.clientX - rect.left - rect.width / 2) * 0.12)
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
      onBlur={() => {
        x.set(0)
        y.set(0)
      }}
    >
      <span>{children}</span>
      <ArrowUpRight size={18} aria-hidden="true" className="directional-icon" />
    </motion.a>
  )
}
