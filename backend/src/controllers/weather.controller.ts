import type { Request, Response } from "express";
import type { WeatherService } from "../services/weather.service";
import { searchLocationsSchema } from "../validation/weather.schema";

export class WeatherController {
  private weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  async searchLocations(req: Request, res: Response) {
    const { q } = searchLocationsSchema.parse(req.query);
    const locations = await this.weatherService.searchLocations(q);

    return res.json(locations);
  }
}
