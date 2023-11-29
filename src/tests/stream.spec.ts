import { test, expect } from "@playwright/test";
import { WebSocket } from "ws";

import apiBinance from "../controllers/api.binance";
import { connectToWebSocket } from "../controllers/ws.binance";

test("Check buffer", async ({ page }) => {
  await apiBinance.init();

  await page.goto("/en/trade/BTC_USDT");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Binance Spot/);

  try {
    const websocket = await connectToWebSocket();
    expect(websocket.readyState, "Verify Trade Streaming connection").toBe(
      WebSocket.OPEN
    );
    const { lastUpdateId, bids, asks } = await apiBinance.getData();
    let savedUpdate: number;
    websocket.onmessage = async (event) => {
      const data = event.data;

      const { e, E, s, U, u, b, a } = JSON.parse(data as string);
      if (!savedUpdate) {
        if (u <= lastUpdateId) {
          console.log("u is <= lastUpdateId in the snapshot: drop case");
        } else {
          expect(u).toBeGreaterThanOrEqual(lastUpdateId + 1);
          expect(U).toBeLessThanOrEqual(lastUpdateId + 1);
          savedUpdate = u + 1;
          console.log("U <= lastUpdateId+1 AND u >= lastUpdateId+1: case done");
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

  await page.waitForTimeout(10000);
});
