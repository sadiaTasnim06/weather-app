import type { Weather } from "../types/weather";
import type { Location } from "../types/location";

export interface WeatherProvider {
  searchLocations(query: string): Promise<Location[]>;
  getWeather(latitude: number, longitude: number): Promise<Weather>;
}
