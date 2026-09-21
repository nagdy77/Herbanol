# Herbanol

An English-only, frontend-only React/Vite company website. No backend, database, authentication, or API.

## Development

Node.js 24 LTS and npm are required.

- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run format:check`
- `npm run test:e2e`

On Windows with a restricted PowerShell execution policy, use `npm.cmd`.
Browser tests use the installed Microsoft Edge browser, in desktop and mobile emulation. They test English-only behavior, legacy language preferences, exact product values, routing, asset loading, motion preferences, and console errors. Test artifacts are ignored by Git.

## Content and architecture

- Homepage sections: `src/components/sections`
- Layout and reusable UI: `src/components/layout`, `src/components/ui`
- English content: `src/locales/en/translation.json`
- English-only i18next setup: `src/i18n.ts`
- Verified contact/media links: `src/data/company.ts`
- Exact approximate analysis values: `src/data/product.ts`
- Theme, layouts, and section styles: `src/styles`
- Motion hooks: `src/hooks`; shared GSAP/Lenis modules: `src/utils/motion`

The website uses English and left-to-right layout only. Obsolete saved language preferences are cleared; no language switcher is displayed.

Existing page URLs map to their corresponding homepage sections. Unknown URLs redirect to the homepage.

## Assets and content boundaries

Original product and English hero PNGs are used without image modifications. The standalone plant/DNA logo in `src/assets/logos` is used unchanged in the navbar, mobile menu, footer and favicon. A neutral backing preserves its legibility in both themes; no crop, recoloring or artwork edits are applied.

All company/product copy derives from the supplied information. Mission and vision remain aspirations. Datasheet free-from claims are explicitly attributed to the company datasheet. Media titles use excerpts from the original Arabic Facebook titles/captions, with English translations and publisher attribution. No awards, customers, partners, or certifications are invented.

Original Facebook video covers are stored in `src/assets/images/media`. Each was retrieved from the `og:image` metadata of its corresponding supplied Facebook video link and visually checked. They are served locally, without dependence on expiring CDN links. `videoCovers` in `src/data/company.ts` maps covers to videos; missing or failed images show a Facebook-branded placeholder, never unrelated website imagery. The official Facebook page URL is also centralized there.

The location section uses the exact Google Maps embed URL supplied by the user, centralized as `locationEmbedUrl` in `src/data/company.ts`. It uses lazy loading and the supplied strict-origin referrer policy. No street address is inferred. The contact-based fallback remains available if this URL is cleared later.

## Motion

GSAP/ScrollTrigger handles scoped staggered reveals, SVG paths, layered background parallax, and the product presentation. A separate parent layer handles pointer depth without conflicting with scroll transforms. Framer Motion handles the rotating replacement headline and pointer/magnetic interactions. The vertical fade/slide headline has no strike-through, can be paused, stops updating out of view, and displays the original tagline under reduced motion. `useReducedMotionPreference` responds to live preference changes. Lenis uses a single GSAP ticker on fine-pointer devices only. Touch retains native scrolling with active scroll parallax and product motion at reduced distances. All effects clean up on unmount. The scientific readout selects exact supplied values without altering the analysis table.

## Theme and contacts

Light is the default regardless of OS preference. The navbar toggle persists `herbanol-theme` when storage is available, and shared semantic tokens in `theme.css` drive both themes. The floating contact widget includes verified email, WhatsApp, LinkedIn and Facebook links. WhatsApp uses the supplied Egyptian number in international format and a localized, URL-encoded draft message; opening the link does not send it.

## Deployment

The Partners & Achievements strip automatically discovers PNG, JPEG, SVG, WebP, AVIF and GIF images under `src/assets/logos/` on each Vite build, without filename conventions. Documents such as PDFs remain untouched and are not rendered as images. The repeated visual group is hidden from assistive technology; reduced motion provides a static, horizontally scrollable strip.

Build and publish `dist` to a static host with an `index.html` fallback for client-side routes. Supplied PNGs remain intact and are relatively large; only the active-language hero loads and the product image loads lazily.
