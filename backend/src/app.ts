import express from "express";
import pinoHttp from "pino-http";
import { logger } from "./config/logger";
import { errorHandler } from "./middleware/error.middleware";
import cors from "cors";
import { env } from "./config/env";
import { weatherController } from "./composition";
import { createWeatherRouter } from "./routes/weather.routes";

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
app.use("/api/v1", createWeatherRouter(weatherController));

app.use(errorHandler);

export default app;
