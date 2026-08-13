import type { Request, Response } from "express";
import type { WeatherService } from "../services/weather.service";

export class WeatherController {
  private weatherService: WeatherService;

  constructor(weatherService: WeatherService) {
    this.weatherService = weatherService;
  }

  async searchLocations(req: Request, res: Response) {
    const query = req.query.q as string;

    const locations = await this.weatherService.searchLocations(query);

    return res.json(locations);
  }
}
