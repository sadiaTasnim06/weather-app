import type { WeatherProvider } from "../providers/weather.provider";
import { Weather } from "../types/weather";
import { Location } from "../types/location";

export class WeatherService {
  private weatherProvider: WeatherProvider;

  constructor(weatherProvider: WeatherProvider) {
    this.weatherProvider = weatherProvider;
  }

  async searchLocations(query: string): Promise<Location[]> {
    return this.weatherProvider.searchLocations(query);
  }

  async getWeather(latitude: number, longitude: number): Promise<Weather> {
    return this.weatherProvider.getWeather(latitude, longitude);
  }
}
