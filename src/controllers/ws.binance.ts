import { WebSocket } from "ws";

import { wsQueryFormater } from "../utils";

export const connectToWebSocket = (symbol: string[]): Promise<WebSocket> => {
  const query = wsQueryFormater(symbol);
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${process.env.STREAM_URL}${query}`);

    ws.on("open", () => {
      console.log("WebSocket connection established.");
      resolve(ws);
    });

    ws.on("message", (data) => {
      console.log("Received message:", data);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error.message);
      reject(error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed.");
    });
  });
};
