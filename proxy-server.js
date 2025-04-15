import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());

app.use(
  "/api/ocr", // Proxy route
  createProxyMiddleware({
    target: "https://api-premed.azurewebsites.net", // API base URL
    changeOrigin: true,
    pathRewrite: { "^/api/ocr": "/Medicine/OCR" }, // Correct path mapping
    logLevel: "debug", // Enable debugging logs
  })
);

app.listen(5000, () => {
  console.log("Proxy server running on port 5000");
});
