import { test, expect } from '@playwright/test'
const locationEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3444.0238546152323!2d31.46974107620218!3d30.321839305373327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14580700720ec797%3A0xc90b4596f154ef8c!2zSGVyYmFub2wgQ29tcGFueS0g2YfZitix2KjYp9mG2YjZhA!5e0!3m2!1sen!2seg!4v1789925199907!5m2!1sen!2seg'

// Keep app regression checks independent of Google's third-party network/runtime.
// The real iframe is also checked separately in the live browser smoke check.
test.beforeEach(async ({ page }) => {
  await page.route('https://www.google.com/maps/embed?**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><html><body></body></html>',
    }),
  )
})

const exactValues = [
  '49%',
  '6–6.5',
  '0.5 dS/m',
  '62 ppm',
  '355 ppm',
  '0.9%',
  '90%',
  '51%',
  '60:1',
  '0.05%',
  '0.03%',
  '642%',
  '11.73%',
]

for (const language of ['en']) {
  test(
    language + ': content, assets, layout, and persistence',
    async ({ page }, testInfo) => {
      const errors: string[] = []
      page.on('pageerror', (error) => errors.push(error.message))
      page.on('console', (message) => {
        if (message.type() === 'error') errors.push(message.text())
      })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto('/')

      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
      await expect(page.locator('h1')).toHaveAccessibleName(
        'Waste less, Grow more',
      )
      await expect(page.locator('.hero-image-frame img')).toHaveAttribute(
        'src',
        /herbanol-hero-en/,
      )
      await expect(page.locator('tbody td')).toHaveText(exactValues)
      await expect(page.locator('.media-item')).toHaveCount(3)
      await expect(page.locator('.hero-image-frame img')).toBeVisible()
      await expect
        .poll(() =>
          page
            .locator('.hero-image-frame img')
            .evaluate((img) => (img as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0)
      await page.locator('#product').scrollIntoViewIfNeeded()
      await expect
        .poll(() =>
          page
            .locator('.product-image-scroll img')
            .evaluate((img) => (img as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({
        path: testInfo.outputPath(language + '-hero.png'),
        scale: 'css',
      })
      await page.screenshot({
        path: testInfo.outputPath(language + '-full.png'),
        fullPage: true,
        scale: 'css',
      })
      await page.reload()
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      await expect(page.locator('h1')).toBeVisible()
      expect(errors).toEqual([])
    },
  )
}

test('navigation and direct links reach real sections', async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.locator('#mobile-navigation')).toBeVisible()
    await page
      .locator('#mobile-navigation')
      .getByRole('link', { name: 'Herbanol Peat', exact: true })
      .click()
    await expect(page.locator('#mobile-navigation')).toBeHidden()
  } else {
    await page
      .locator('.desktop-nav')
      .getByRole('link', { name: 'Herbanol Peat', exact: true })
      .click()
  }
  await expect(page).toHaveURL(/#product$/)
  await expect(page.locator('#product')).toBeFocused()
  for (const [path, section] of [
    ['about', 'about'],
    ['products', 'product'],
    ['technology', 'technology'],
    ['sustainability', 'sustainability'],
    ['achievements', 'media'],
    ['contact', 'contact'],
  ]) {
    await page.goto('/' + path)
    await expect(page).toHaveURL(new RegExp('/#' + section + '$'))
    await expect(page.locator('#' + section)).toBeFocused()
  }
  await expect(page.locator('.contact-copy a')).toHaveAttribute(
    'href',
    'mailto:herbanol.co@gmail.com',
  )
  await page.goto('/not-a-page')
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('.hero-title')).toBeVisible()
})

test('motion, counters, and live reduced-motion changes', async ({
  page,
  isMobile,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.hero-image-frame')).toHaveCSS('opacity', '1')
  if (!isMobile) await expect(page.locator('html')).toHaveClass(/lenis/)
  else await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await page.locator('.product-scientific-strip').scrollIntoViewIfNeeded()
  await expect(page.locator('.product-scientific-strip strong')).toHaveText([
    '110 L',
    '6\u20136.5',
    '0.5 dS/m',
    '642%',
  ])
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('html')).not.toHaveClass(/lenis/)
  await expect(page.locator('.product-image-scroll')).toHaveCSS(
    'transform',
    'none',
  )
  await expect(page.locator('.about-description')).toHaveCSS('opacity', '1')

  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  expect(errors).toEqual([])
})

test('narrow layouts, and keyboard navigation', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 })
    for (const language of ['en']) {
      await expect(page.locator('html')).toHaveAttribute('lang', language)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true)
      if (width === 320) {
        await page.screenshot({
          path: testInfo.outputPath(language + '-320.png'),
          scale: 'css',
        })
        await page
          .getByRole('button', {
            name: 'Open navigation',
          })
          .click()
        await page.keyboard.press('Escape')
        await expect(page.locator('#mobile-navigation')).toBeHidden()
        await expect(page.locator('.menu-toggle')).toBeFocused()
      }
    }
  }
  await page.locator('.skip-link').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('#main-content')).toBeFocused()
})

test('English remains usable when storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Storage blocked', 'SecurityError')
      },
    })
  })
  await page.goto('/')
  await expect(page.locator('h1')).toBeVisible()

  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')

  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
})

test('media links, scientific readout, layered images, and connected location', async ({
  page,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.depth-backdrop')).toHaveCount(3)
  await expect
    .poll(() =>
      page
        .locator('.depth-backdrop--hero .depth-layer--near img')
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0)
  await page.locator('#science').scrollIntoViewIfNeeded()
  await page
    .getByRole('button', {
      name: 'Inspect Water-holding capacity',
      exact: true,
    })
    .click()
  await expect(page.locator('.readout-content strong')).toHaveText('642%')
  await expect(page.locator('tbody td')).toHaveText(exactValues)
  const urls = [
    'https://www.facebook.com/share/v/17DkSXvj4v/?mibextid=wwXIfr',
    'https://www.facebook.com/share/v/1MxdF9pHyn/?mibextid=wwXIfr',
    'https://www.facebook.com/share/v/183qUrTofV/?mibextid=wwXIfr',
  ]
  for (const [index, url] of urls.entries()) {
    await expect(page.locator('.media-item').nth(index)).toHaveAttribute(
      'href',
      url,
    )
    await expect(page.locator('.media-item').nth(index)).toHaveAttribute(
      'target',
      '_blank',
    )
  }
  await expect(page.locator('.map-panel iframe')).toHaveAttribute(
    'src',
    locationEmbedUrl,
  )
  await expect(page.locator('.map-panel iframe')).toHaveAttribute(
    'referrerpolicy',
    'strict-origin-when-cross-origin',
  )
  await expect(page.locator('.map-pending')).toHaveCount(0)
  await page.locator('#media').scrollIntoViewIfNeeded()
  for (let index = 0; index < 3; index++) {
    const cover = page.locator('.media-art img').nth(index)
    await expect(cover).toHaveAttribute(
      'src',
      new RegExp('herbanol-facebook-video-' + (index + 1)),
    )
    await expect
      .poll(() =>
        cover.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBe(1920)
  }
  await expect(page.locator('.media-cover-placeholder')).toHaveCount(0)
  const facebook = 'https://www.facebook.com/p/Herbanol-Company-61569695805373/'
  await expect(page.locator('.media-social-links a').first()).toHaveAttribute(
    'href',
    facebook,
  )
  await expect(page.locator('footer a[href="' + facebook + '"]')).toHaveCount(1)
  for (const id of ['product', 'media', 'science', 'contact', 'location']) {
    await page.locator('#' + id).scrollIntoViewIfNeeded()
    await page
      .locator('#' + id)
      .screenshot({ path: testInfo.outputPath(id + '.png'), scale: 'css' })
  }

  await page.locator('#science').scrollIntoViewIfNeeded()
  await expect(page.locator('.readout-content strong')).toHaveText('642%')
  await expect(page.locator('.map-panel iframe')).toHaveAttribute(
    'title',
    'Herbanol location on Google Maps',
  )

  expect(errors).toEqual([])
})

test('rotating headline can pause and respects reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.locator('.phrase-stage')).toHaveAttribute(
    'data-phrase-index',
    '0',
  )
  await expect(page.locator('.phrase-stage')).toHaveAttribute(
    'data-phrase-index',
    '1',
    { timeout: 8500 },
  )
  await page.getByRole('button', { name: 'Pause rotating headline' }).click()
  await expect(
    page.getByRole('button', { name: 'Resume rotating headline' }),
  ).toHaveAttribute('aria-pressed', 'true')
  // Observe more than one complete cycle to verify that the timer stopped.
  await page.waitForTimeout(5100)
  await expect(page.locator('.phrase-stage')).toHaveAttribute(
    'data-phrase-index',
    '1',
  )
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.phrase-stage')).toHaveAttribute(
    'data-phrase-index',
    '0',
  )
  await expect(page.locator('.phrase-controls button')).toHaveCount(0)

  await expect(page.locator('.rotating-phrase')).toHaveText('Grow more.')
})

test('missing cover uses a branded fallback rather than website imagery', async ({
  page,
}) => {
  await page.route('**/herbanol-facebook-video-1.jpg', (route) => route.abort())
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/#media')
  await expect(
    page.locator('.media-item').first().locator('.media-cover-placeholder'),
  ).toBeVisible()
  await expect(
    page.locator('.media-item').first().locator('.media-art img'),
  ).toHaveCount(0)
  await expect(page.locator('.media-cover-placeholder svg')).toHaveCount(1)
})

test('legacy language preferences cannot restore the removed locale', async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem('herbanol-language', 'ar'),
  )
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')
  await expect(page.locator('.language-switcher')).toHaveCount(0)
  await expect(page.locator('h1')).toHaveAccessibleName('Waste less, Grow more')
  await expect(page.locator('body')).not.toContainText(/[\u0600-\u06ff]/)
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
})
