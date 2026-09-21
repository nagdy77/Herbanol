import { test, expect } from '@playwright/test'
for (const language of ['en']) {
  test(`product showcase ${language}: metrics and bounded annotations`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.addInitScript(
      (lang) => localStorage.setItem('herbanol-language', lang),
      language,
    )
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-intro', 'done')
    const product = page.locator('#product')
    await product.scrollIntoViewIfNeeded()
    await expect(product.locator('img')).toHaveAttribute('alt', /110/)
    await expect(product).not.toContainText(/65\s*(L|لتر)/)
    for (const item of await product
      .locator('.product-callout, .volume-badge')
      .all()) {
      const box = await item.boundingBox()
      expect(box!.x).toBeGreaterThanOrEqual(0)
      expect(box!.x + box!.width).toBeLessThanOrEqual(
        page.viewportSize()!.width,
      )
    }
    await product.screenshot({ path: testInfo.outputPath('product-light.png') })
    await page.locator('.theme-toggle').click()
    await product.screenshot({ path: testInfo.outputPath('product-dark.png') })
  })
}
