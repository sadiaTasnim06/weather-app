import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./config/logger";
import { errorHandler } from "./middleware/error.middleware";
import { weatherRouter } from "./routes/weather.routes";
import cors from "cors";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.corsOrigin,
  }),
);
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
  });
});
app.use("/api/v1", weatherRouter);

app.use(errorHandler);

export default app;
