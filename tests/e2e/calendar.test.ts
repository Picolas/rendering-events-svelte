import { test, expect } from '@playwright/test';

test('affiche le calendrier', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.calendar-container')).toBeVisible();
  await expect(page.locator('role=rowheader')).toBeVisible();
});

test('redimensionne correctement', async ({ page }) => {
  await page.goto('/');

  await page.setViewportSize({ width: 800, height: 600 });
  await page.waitForSelector('.event');

  const event = page.locator('.event').first();
  const initialBounds = await event.boundingBox();

  await page.setViewportSize({ width: 1600, height: 900 });
  await page.waitForTimeout(100);

  const newBounds = await event.boundingBox();

  expect(newBounds).toBeTruthy();
  expect(initialBounds).toBeTruthy();

  const dimensionsChanged =
    initialBounds!.width !== newBounds!.width ||
    initialBounds!.height !== newBounds!.height ||
    initialBounds!.x !== newBounds!.x ||
    initialBounds!.y !== newBounds!.y;

  expect(dimensionsChanged).toBe(true);
});