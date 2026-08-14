import { Router } from "express";
import { WeatherController } from "../controllers/weather.controller";

export function createWeatherRouter(weatherController: WeatherController) {
  const router = Router();

  router.get("/locations", weatherController.searchLocations);
  router.get("/weather", weatherController.getWeather);

  return router;
}
