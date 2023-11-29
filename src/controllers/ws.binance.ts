import { WebSocket } from "ws";

export const connectToWebSocket = (): Promise<WebSocket> => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(process.env.STREAM_URL as string);

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
