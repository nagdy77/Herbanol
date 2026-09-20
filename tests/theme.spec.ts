import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('https://www.google.com/maps/embed?**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<html><body></body></html>',
    }),
  )
})

test('light default, persistent dark theme, bilingual full-page visual review and contacts', async ({
  page,
  isMobile,
}, testInfo) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await expect(page.locator('.site-header .wordmark img')).toBeVisible()
  await expect
    .poll(() =>
      page
        .locator('.site-header .wordmark .brand-logo')
        .evaluate((img) => (img as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0)
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    'href',
    /07_01_48/,
  )
  await expect(page.locator('#location a[href*="linkedin"]')).toHaveCount(0)
  await expect(page.locator('.phrase-strike')).toHaveCount(0)
  for (const locale of ['en', 'ar']) {
    await page
      .getByRole('button', {
        name: locale === 'en' ? 'EN' : 'عربي',
        exact: true,
      })
      .click()
    for (const theme of ['light', 'dark']) {
      if ((await page.locator('html').getAttribute('data-theme')) !== theme)
        await page.locator('.theme-toggle').click()
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
      const credit = page.locator('.footer-bottom .developer-credit')
      await credit.scrollIntoViewIfNeeded()
      await expect(credit).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/abdelrahman-elnagdy-176a82244',
      )
      await expect(credit).toHaveAttribute('target', '_blank')
      await expect(credit).toHaveAttribute('rel', 'noopener noreferrer')
      await expect(credit).toHaveAccessibleName(
        locale === 'en'
          ? 'Developed by ElNagdy — LinkedIn'
          : 'تطوير ElNagdy — لينكدإن',
      )
      await expect
        .poll(() =>
          credit
            .locator('img')
            .evaluate((img) => (img as HTMLImageElement).naturalWidth),
        )
        .toBe(2172)
      await page.locator('footer').screenshot({
        path: testInfo.outputPath(`${locale}-${theme}-footer.png`),
        scale: 'css',
      })
      for (const section of [
        'home',
        'about',
        'product',
        'applications',
        'technology',
        'sustainability',
        'science',
        'media',
        'location',
        'contact',
      ]) {
        await page.locator('#' + section).scrollIntoViewIfNeeded()
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.screenshot({
        path: testInfo.outputPath(`${locale}-${theme}-full.png`),
        fullPage: true,
        scale: 'css',
      })
      await page.locator('.floating-contact-toggle').click()
      const links = page.locator('.floating-contact-links a')
      await expect(links).toHaveCount(3)
      await expect(links.nth(0)).toHaveAttribute(
        'href',
        'mailto:herbanol.com@gmail.com',
      )
      await expect(links.nth(1)).toHaveAttribute(
        'href',
        'https://www.linkedin.com/company/herbanol-company/',
      )
      await expect(links.nth(2)).toHaveAttribute(
        'href',
        'https://www.facebook.com/p/Herbanol-Company-61569695805373/',
      )
      await page.screenshot({
        path: testInfo.outputPath(`${locale}-${theme}-widget.png`),
        scale: 'css',
      })
      await page.keyboard.press('Escape')
      await expect(page.locator('.floating-contact-toggle')).toBeFocused()
    }
  }
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')
  if (isMobile) {
    await page.locator('.menu-toggle').click()
    await expect(page.locator('#mobile-navigation .brand-logo')).toBeVisible()
    await expect(page.locator('.floating-contacts')).toBeHidden()
  }
  expect(errors).toEqual([])
})

test('scroll moves depth and product on every device and reduced motion reverts it', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const layer = page.locator('.depth-backdrop--hero .depth-layer--near')
  await expect(layer).not.toHaveCSS('transform', 'none')
  const before = await layer.evaluate((el) => getComputedStyle(el).transform)
  await page.evaluate(() => window.scrollTo(0, 350))
  await expect
    .poll(() => layer.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(before)
  await page.locator('.product-stage').scrollIntoViewIfNeeded()
  const product = page.locator('.product-image-scroll')
  await expect(product).not.toHaveCSS('transform', 'none')
  const previous = await product.evaluate(
    (el) => getComputedStyle(el).transform,
  )
  await page.evaluate(() => window.scrollBy(0, 150))
  await expect
    .poll(() => product.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(previous)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(layer).toHaveCSS('transform', 'none')
  await expect(product).toHaveCSS('transform', 'none')
})

test('theme works without localStorage', async ({ page }) => {
  await page.addInitScript(() =>
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError')
      },
    }),
  )
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light')
  await page.locator('.theme-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})
