import { test, expect } from '@playwright/test'

for (const locale of ['en', 'ar']) {
  test(`fresh ${locale} entrance, refresh replay and anchor navigation`, async ({
    page,
  }, testInfo) => {
    await page.addInitScript((locale) => {
      localStorage.setItem('herbanol-language', locale)
      localStorage.setItem('herbanol-theme', 'dark')
    }, locale)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    await expect(page.locator('.intro-loader')).toBeVisible()
    await expect(page.locator('#root')).toHaveAttribute('inert', '')
    await expect(page.locator('.intro-brand p')).toHaveText(
      locale === 'en' ? 'Waste less, Grow more' : 'هدر أقل، ونمو أفضل',
    )
    await expect(page.locator('.intro-logo')).toHaveAttribute('src', /07_01_48/)
    await page.screenshot({ path: testInfo.outputPath('entrance.png') })
    await expect(page.locator('.intro-loader')).toHaveCount(0, {
      timeout: 2600,
    })
    await expect(page.locator('#root')).not.toHaveAttribute('inert')
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
    await page.locator('.theme-toggle').click()
    await page.locator('.language-switcher button').first().click()
    await page.goto('/#product')
    await expect(page.locator('.intro-loader')).toHaveCount(0)
    await page.reload()
    await expect(page.locator('.intro-loader')).toBeVisible()
    await expect(page.locator('.intro-loader')).toHaveCount(0, {
      timeout: 2600,
    })
    await expect(page.locator('#intro-root')).toBeHidden()
  })
}

test('reduced motion is a short fade and blocked storage remains usable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'sessionStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError')
      },
    })
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.locator('.intro-loader')).toHaveCount(0, { timeout: 900 })
  await expect(page.locator('#root')).not.toHaveAttribute('inert')
  await page.locator('.theme-toggle').click()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
})

test('prepaint curtain releases even when the application bundle is delayed', async ({
  page,
}) => {
  await page.route('**/src/main.tsx*', (route) => route.abort())
  await page.goto('/')
  await expect(page.locator('#intro-root')).toBeVisible()
  await expect(page.locator('#intro-root')).toHaveCSS(
    'background-color',
    'rgb(7, 35, 31)',
  )
  await expect(page.locator('#intro-root')).toBeHidden({ timeout: 3000 })
  await expect(page.locator('#root')).not.toHaveAttribute('inert')
})
