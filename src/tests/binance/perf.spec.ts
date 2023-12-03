import { test, expect } from "@playwright/test";

test.describe("Performances", () => {
  test("Get performance metrics", async ({ page }) => {
    // https://playwright.dev/docs/api/class-cdpsession
    //Create a new connection to an existing CDP session to enable performance Metrics
    const session = await page.context().newCDPSession(page);
    //To tell the CDPsession to record performance metrics.
    await session.send("Performance.enable");
    await page.goto("/en/trade/BTC_USDT");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Binance Spot/);

    await expect(
      page.locator(`[id="onetrust-accept-btn-handler"]`)
    ).toBeVisible();
    await page.locator(`[id="onetrust-accept-btn-handler"]`).click();

    console.log("============Chrome DevTools Protocol==============");
    console.log("==============Performance Metrics================");
    const performanceMetrics = await session.send("Performance.getMetrics");
    console.log(performanceMetrics.metrics);
  });

  test("Capture performance traces by marking actions using Performance API", async ({
    page,
    browser,
  }) => {
    // https://playwright.dev/docs/api/class-browser#browser-start-tracing
    console.log("========== Start Tracing Perf ===========");
    await browser.startTracing(page, {
      path: "./perfTraces.json",
      screenshots: true,
    });

    await page.goto("/en/trade/BTC_USDT");

    //Using Performanc.mark API
    await page.evaluate(() => window.performance.mark("Perf:Started"));

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Binance Spot/);

    await expect(
      page.locator(`[id="onetrust-accept-btn-handler"]`)
    ).toBeVisible();
    await page.locator(`[id="onetrust-accept-btn-handler"]`).click();

    //Using performance.mark API
    await page.evaluate(() => window.performance.mark("Perf:Ended"));

    //Performance measure
    await page.evaluate(() =>
      window.performance.measure("overall", "Perf:Started", "Perf:Ended")
    );

    //To get all performance marks
    const getAllMarksJson = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType("mark"))
    );
    const getAllMarks = await JSON.parse(getAllMarksJson);
    console.log('window.performance.getEntriesByType("mark")', getAllMarks);

    //To get all performance measures of Google
    const getAllMeasuresJson = await page.evaluate(() =>
      JSON.stringify(window.performance.getEntriesByType("measure"))
    );
    const getAllMeasures = await JSON.parse(getAllMeasuresJson);
    console.log(
      'window.performance.getEntriesByType("measure")',
      getAllMeasures
    );

    console.log("======= Stop Tracing ============");
    await browser.stopTracing();
  });
});
