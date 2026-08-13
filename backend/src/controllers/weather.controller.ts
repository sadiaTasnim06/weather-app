import type { Request, Response } from "express";
import type { WeatherService } from "../services/weather.service";
import {
  getWeatherSchema,
  searchLocationsSchema,
} from "../validation/weather.schema";

export class WeatherController {
  private weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  searchLocations = async (req: Request, res: Response) => {
    const { q } = searchLocationsSchema.parse(req.query);

    const locations = await this.weatherService.searchLocations(q);

    return res.json(locations);
  };

  getWeather = async (req: Request, res: Response) => {
    const { latitude, longitude } = getWeatherSchema.parse(req.query);

    const weather = await this.weatherService.getWeather(latitude, longitude);

    return res.json(weather);
  };
}
