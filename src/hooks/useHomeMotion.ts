import { useCallback, type RefObject } from 'react'
import { useTranslation } from 'react-i18next'
import { useScopedMotion } from './useScopedMotion'
import { gsap } from '../utils/motion/gsap'

export function useHomeMotion(scope: RefObject<HTMLDivElement | null>) {
  const { i18n } = useTranslation()
  const language = i18n.language
  const setup = useCallback(() => {
    // Scope every query to this route. Recreate after text direction/size changes.
    const select = gsap.utils.selector(scope)
    select('[data-reveal]').forEach((element: HTMLElement) => {
      if (element.closest('[data-stagger]')) return
      gsap.from(element, {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
      })
    })
    select('[data-stagger]').forEach((group) => {
      gsap.from(group.querySelectorAll('[data-reveal]'), {
        y: 28,
        opacity: 0,
        stagger: 0.09,
        duration: 0.85,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: group, start: 'top 92%', once: true },
      })
    })
    gsap.from(select('.readout-rule'), {
      scaleX: 0,
      duration: 1.3,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: select('.analysis-focus')[0],
        start: 'top 85%',
        once: true,
      },
    })
    gsap.from(select('[data-image-reveal]'), {
      y: 32,
      opacity: 0,
      duration: 1.15,
      delay: 0.2,
      ease: 'power3.out',
    })
    select('.dna-graphic').forEach((element) => {
      gsap.from(element.querySelectorAll('.dna-path'), {
        strokeDasharray: 1,
        strokeDashoffset: 1,
        duration: 2,
        stagger: 0.15,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      })
    })
    gsap.from(select('.process-connector path'), {
      strokeDasharray: 1,
      strokeDashoffset: 1,
      duration: 1.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: select('.process-flow')[0],
        start: 'top 85%',
        once: true,
      },
    })
    gsap.from(select('.plant-stem, .plant-vein'), {
      strokeDasharray: 1,
      strokeDashoffset: 1,
      duration: 1.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: select('.nature-art')[0],
        start: 'top 80%',
        once: true,
      },
    })
    select('.section-thread').forEach((thread) => {
      gsap.from(thread, {
        scaleY: 0.25,
        opacity: 0.3,
        ease: 'none',
        scrollTrigger: {
          trigger: thread.closest('section'),
          start: 'top 95%',
          end: 'top 45%',
          scrub: 0.7,
        },
      })
    })
    const motionMedia = gsap.matchMedia()
    motionMedia.add(
      { compact: '(max-width: 1023px)', wide: '(min-width: 1024px)' },
      (context) => {
        const intensity = context.conditions?.compact ? 0.72 : 1
        gsap.fromTo(
          select('.hero-image-scroll'),
          { y: 14 * intensity },
          {
            y: -24 * intensity,
            ease: 'none',
            scrollTrigger: {
              trigger: select('.hero-visual')[0],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
            },
          },
        )
        select('.depth-backdrop').forEach((backdrop) => {
          const trigger = backdrop.parentElement
          gsap.fromTo(
            backdrop.querySelector('.depth-layer--near'),
            { yPercent: -3 * intensity, scale: 1.02 },
            {
              yPercent: 5 * intensity,
              scale: 1.07,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            },
          )
          gsap.fromTo(
            backdrop.querySelector('.depth-layer--far'),
            { yPercent: -2 * intensity },
            {
              yPercent: 2 * intensity,
              ease: 'none',
              scrollTrigger: {
                trigger,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 2,
              },
            },
          )
          gsap.to(backdrop.querySelectorAll('.depth-symbol, .depth-particle'), {
            y: -45 * intensity,
            rotation: 12 * intensity,
            stagger: 0.1,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          })
          gsap.to(backdrop.querySelector('.depth-orbit'), {
            rotation: 35 * intensity,
            ease: 'none',
            scrollTrigger: {
              trigger,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          })
        })
        gsap.fromTo(
          select('.product-stage-halo'),
          { scale: 0.8, opacity: 0.6 },
          {
            scale: 1.12,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: select('.product-stage')[0],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          },
        )
        gsap.to(select('.product-callout--roots, .product-callout--stable'), {
          y: -24 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.product-stage')[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
        gsap.to(select('.product-callout--water'), {
          y: 26 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.product-stage')[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
        gsap.to(select('.hero-dna'), {
          y: 65 * intensity,
          rotation: language === 'ar' ? -8 : 8,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.hero')[0],
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        })
        gsap.to(select('.floating-label--top'), {
          y: -35 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.hero')[0],
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
        gsap.to(select('.floating-label--bottom'), {
          y: 25 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.hero')[0],
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
        gsap.fromTo(
          select('.product-image-scroll'),
          { y: 35 * intensity, rotation: -5 * intensity, scale: 0.94 },
          {
            y: -25 * intensity,
            rotation: 3 * intensity,
            scale: 1.02,
            ease: 'none',
            scrollTrigger: {
              trigger: select('.product-stage')[0],
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          },
        )
        gsap.to(select('.nature-art-ring--inner'), {
          rotation: 40 * intensity,
          ease: 'none',
          scrollTrigger: {
            trigger: select('.nature-art')[0],
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      },
    )
    return () => motionMedia.revert()
  }, [scope, language])
  useScopedMotion(scope, setup)
}
