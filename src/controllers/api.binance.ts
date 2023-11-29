import { APIRequestContext, request } from "@playwright/test";

class APIBinanceController {
  private api: APIRequestContext;
  buffer: any;

  async init() {
    this.api = await request.newContext({
      baseURL: process.env.API_URL,
    });
  }

  async getData() {
    const res = await this.api.get("/api/v3/depth?symbol=BNBBTC&limit=1");
    return await res.json();
  }
}

export default new APIBinanceController();
