# Motion

- `useScopedMotion` provides a component-scoped GSAP context and live reduced-motion cleanup.
- `useHomeMotion` handles viewport reveals, helix/plant paths, and responsive parallax/product movement (72% distance on compact screens). Match-media contexts clean up on route changes, and unmount.
- `useSmoothScroll` owns the only Lenis instance and drives it with the GSAP ticker. Touch devices and reduced-motion users retain native scrolling. Ticker callbacks/listeners are removed on cleanup.
- Framer Motion handles the pausable replacement headline and spring-based pointer movement. `useReducedMotionPreference` subscribes to live browser/OS preference changes. The same element/property is never controlled by both animation systems.
- `DepthBackdrop` adds pointer movement to a wrapper while scroll effects animate its children; match-media cleanup disables mouse input on touch while retaining scroll motion; reduced motion restores the static composition.
- Counters keep the exact final value available to assistive technology throughout the visual transition.
- The entrance uses `IntroLoader` on each full page load or refresh (never on client-side navigation, theme changes), with a roughly two-second curtain animation and a short reduced-motion fade. A prepaint curtain prevents page flashes and a 2.5-second failsafe releases it even if JavaScript loading fails. It never waits for network readiness. Escape dismisses it early.
- Content stays visible when motion is disabled. No continuously looping decorations or pinned scroll traps.
- Future effects should use transforms/opacity, avoid layout animation and large animated filters, and be tested on touch and reduced-motion settings.

References: [GSAP matchMedia](<https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/>), [GSAP React](https://github.com/greensock/react), [Lenis](https://github.com/darkroomengineering/lenis).
