import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/en/trade/BTC_USDT');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Binance Spot/);
});

