import {
  APIRequestContext,
  request,
  expect,
  APIResponse,
} from "@playwright/test";

class APIBinanceController {
  private api: APIRequestContext;
  buffer: any;

  async init() {
    this.api = await request.newContext({
      baseURL: process.env.API_URL,
    });
  }

  async getData() {
    let res: APIResponse;
    await expect(async () => {
      res = await this.api.get("/api/v3/depth?symbol=BNBBTC&limit=1");
      expect(res.status()).toBe(200);
    }).toPass();
    return await res!.json();
  }
}

export default new APIBinanceController();
