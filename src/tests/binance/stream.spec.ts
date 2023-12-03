import { test, expect } from "@playwright/test";
import { WebSocket } from "ws";

// Import controllers
import apiBinance from "../../controllers/api.binance";
import { connectToWebSocket } from "../../controllers/ws.binance";

// Test parametrise
const markets = [{ link: "BTC_USDT", symbol: "BNBBTC" }];

for (const { link, symbol } of markets) {
  test.describe("Stream", () => {
    test(`Check buffer for ${link}`, async ({ page }) => {
      await apiBinance.init();

      await page.goto(`/en/trade/${link}`);

      try {
        const websocket = await connectToWebSocket([symbol]);
        expect(websocket.readyState, "Verify Trade Streaming connection").toBe(
          WebSocket.OPEN
        );
        const { lastUpdateId } = await apiBinance.get("/api/v3/depth", {
          symbol,
          limit: "10",
        });
        let savedUpdate: number;
        websocket.onmessage = async (event) => {
          const data = event.data;

          const { U, u } = JSON.parse(data as string);
          if (!savedUpdate) {
            if (u <= lastUpdateId) {
              console.log("u is <= lastUpdateId in the snapshot: drop case");
            } else {
              expect(u).toBeGreaterThanOrEqual(lastUpdateId + 1);
              expect(U).toBeLessThanOrEqual(lastUpdateId + 1);
              savedUpdate = u + 1;
              console.log(
                "U <= lastUpdateId+1 AND u >= lastUpdateId+1: case done"
              );
            }
          } else {
            expect(U).toEqual(savedUpdate);
            savedUpdate = u + 1;
            console.log("U is equal to the previous event's u+1: case done");
          }
        };
      } catch (error) {
        console.error("WebSocket connection failed: ", error);
      }

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Binance Spot/);

      await page.waitForTimeout(5000);
    });
  });
}
