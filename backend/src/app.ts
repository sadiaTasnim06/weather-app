import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./config/logger";

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

export default app;
