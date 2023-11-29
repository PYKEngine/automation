import { WebSocket } from "ws";

export const connectToWebSocket = (): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbbtc@depth");

    ws.on("open", () => {
      console.log("WebSocket connection established.");
      resolve(ws);
    });

    ws.on("message", () => {
      console.log("Received message:");
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
