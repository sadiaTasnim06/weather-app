import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive().default(3000),
  CORS_ORIGIN: z.url(),
  WEATHER_API_BASE_URL: z.url().default("https://api.open-meteo.com/v1"),
  WEATHER_GEOCODING_BASE_URL: z
    .url()
    .default("https://geocoding-api.open-meteo.com/v1"),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  console.error(
    "Invalid environment configuration:",
    z.treeifyError(result.error),
  );
  process.exit(1);
}

export const env = {
  nodeEnv: result.data.NODE_ENV,
  port: result.data.PORT,
  corsOrigin: result.data.CORS_ORIGIN,
  weatherApiBaseUrl: result.data.WEATHER_API_BASE_URL,
  weatherGeocodingBaseUrl: result.data.WEATHER_GEOCODING_BASE_URL,
};
