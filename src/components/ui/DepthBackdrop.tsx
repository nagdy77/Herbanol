import { Dna, Leaf, Sprout } from 'lucide-react'
import { assets } from '../../data/assets'
import { useRef } from 'react'
import { gsap, useGSAP } from '../../utils/motion/gsap'

export default function DepthBackdrop({
  variant,
}: {
  variant: 'hero' | 'process' | 'contact'
}) {
  const scope = useRef<HTMLDivElement>(null)
  useGSAP(
    () => {
      const media = gsap.matchMedia()
      media.add(
        '(prefers-reduced-motion: no-preference) and (pointer: fine) and (min-width: 1024px)',
        () => {
          const scene = scope.current
          const host = scene?.parentElement
          const layer = scene?.querySelector('.depth-pointer-layer')
          if (!host || !layer) return
          const moveX = gsap.quickTo(layer, 'x', {
            duration: 0.85,
            ease: 'power3.out',
          })
          const moveY = gsap.quickTo(layer, 'y', {
            duration: 0.85,
            ease: 'power3.out',
          })
          const move = (event: PointerEvent) => {
            if (event.pointerType !== 'mouse') return
            const bounds = host.getBoundingClientRect()
            moveX(
              ((event.clientX - bounds.left - bounds.width / 2) /
                bounds.width) *
                22,
            )
            moveY(
              ((event.clientY - bounds.top - bounds.height / 2) /
                bounds.height) *
                16,
            )
          }
          const reset = () => {
            moveX(0)
            moveY(0)
          }
          host.addEventListener('pointermove', move, { passive: true })
          host.addEventListener('pointerleave', reset)
          return () => {
            host.removeEventListener('pointermove', move)
            host.removeEventListener('pointerleave', reset)
          }
        },
      )
      return () => media.revert()
    },
    { scope },
  )
  return (
    <div
      ref={scope}
      className={'depth-backdrop depth-backdrop--' + variant}
      aria-hidden="true"
    >
      <div className="depth-pointer-layer">
        <div className="depth-layer depth-layer--far">
          <img
            src={assets.background}
            alt=""
            loading={variant === 'hero' ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <div className="depth-layer depth-layer--near">
          <img
            src={assets.background}
            alt=""
            loading={variant === 'hero' ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      </div>
      <div className="depth-veil" />
      <div className="depth-grid" />
      <div className="depth-orbit" />
      <Leaf className="depth-symbol depth-symbol--leaf" strokeWidth={0.8} />
      <Dna className="depth-symbol depth-symbol--dna" strokeWidth={0.8} />
      <Sprout className="depth-symbol depth-symbol--sprout" strokeWidth={0.8} />
      <span className="depth-particle depth-particle--one" />
      <span className="depth-particle depth-particle--two" />
      <span className="depth-particle depth-particle--three" />
    </div>
  )
}
