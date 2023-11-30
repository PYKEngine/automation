import {
  APIRequestContext,
  request,
  expect,
  APIResponse,
} from "@playwright/test";

import { queryBuilder } from "../utils";

class APIBinanceController {
  private api: APIRequestContext;

  async init() {
    this.api = await request.newContext({
      baseURL: process.env.API_URL,
    });
  }

  async get(path: string, queryObject: object | null = null) {
    const query = queryBuilder(queryObject);
    let res: APIResponse;
    await expect(async () => {
      res = await this.api.get(`${path}${query}`);
      expect(res.status()).toBe(200);
    }).toPass();
    return await res!.json();
  }
}

export default new APIBinanceController();
