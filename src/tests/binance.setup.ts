import { expect } from "@playwright/test";
import { test as setup } from "../config/test.conf";

// Import controllers
import apiBinance from "../controllers/api.binance";

// Test parametrise
const markets = [{ link: "BTC_USDT", symbol: "BNBBTC" }];

for (const { link, symbol } of markets) {
  setup(`Setup scenario for ${symbol}`, async ({ page }) => {
    await apiBinance.init();

    await page.goto(`/en/trade/${link}`);

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Binance Spot/);

    console.log("Setup complete");

    // This setup can be used to whatever you need to setup before lunching your tests like a logedin state.
  });
}
