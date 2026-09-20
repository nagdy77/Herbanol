import { useEffect } from 'react'
import { Lenis } from '../utils/motion/lenis'
import { gsap, ScrollTrigger } from '../utils/motion/gsap'

export function useSmoothScroll() {
  useEffect(() => {
    const media = gsap.matchMedia()
    media.add(
      '(prefers-reduced-motion: no-preference) and (pointer: fine)',
      () => {
        const lenis = new Lenis({
          autoRaf: false,
          lerp: 0.085,
          smoothWheel: true,
          syncTouch: false,
          anchors: true,
        })
        const tick = (time: number) => lenis.raf(time * 1000)
        lenis.on('scroll', ScrollTrigger.update)
        gsap.ticker.add(tick)
        return () => {
          gsap.ticker.remove(tick)
          lenis.off('scroll', ScrollTrigger.update)
          lenis.destroy()
        }
      },
    )
    return () => media.revert()
  }, [])
}
