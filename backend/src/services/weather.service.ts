import type { Location, WeatherProvider } from "../providers/weather.provider";

export class WeatherService {
  private weatherProvider: WeatherProvider;

  constructor(weatherProvider: WeatherProvider) {
    this.weatherProvider = weatherProvider;
  }

  async searchLocations(query: string): Promise<Location[]> {
    return this.weatherProvider.searchLocations(query);
  }
}
