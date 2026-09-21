import { test, expect } from '@playwright/test'

test('automatic logo strip loops, preserves images and supports RTL/reduced motion', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-intro', 'done', {
    timeout: 3000,
  })
  const strip = page.locator('.partners-strip')
  await strip.scrollIntoViewIfNeeded()
  const first = page.locator('.partners-group').first()
  const images = first.locator('img')
  expect(await images.count()).toBeGreaterThan(1)
  for (const img of await images.all()) {
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0)
    await expect(img).toHaveCSS('object-fit', 'contain')
  }
  const track = page.locator('.partners-track')
  const before = await track.evaluate((el) => getComputedStyle(el).transform)
  await expect
    .poll(() => track.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(before)
  const groups = await page
    .locator('.partners-group')
    .evaluateAll((elements) =>
      elements.map((el) => el.getBoundingClientRect().width),
    )
  expect(groups[0]).toBeCloseTo(groups[1], 2)
  const sources = await images.evaluateAll((elements) =>
    elements.map((el) => (el as HTMLImageElement).src),
  )
  expect(sources[0]).not.toBe(sources.at(-1))
  await page.locator('.theme-toggle').click()
  await strip.screenshot({ path: testInfo.outputPath('partners-dark.png') })
  await page.getByRole('button', { name: 'عربي', exact: true }).click()
  await expect(track).toHaveCSS('animation-direction', 'reverse')
  await expect(page.locator('#partners-title')).toHaveText('الشركاء والإنجازات')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(track).toHaveCSS('animation-name', 'none')
  await expect(page.locator('.partners-group').nth(1)).toBeHidden()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
})
