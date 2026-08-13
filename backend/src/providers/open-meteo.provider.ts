import { AppError } from "../errors/AppError";
import type { Location, WeatherProvider } from "./weather.provider";

export class OpenMeteoProvider implements WeatherProvider {
  async searchLocations(query: string): Promise<Location[]> {
    const params = new URLSearchParams({
      name: query,
      count: "10",
      language: "en",
      format: "json",
    });

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?${params}`,
    );

    if (!response.ok) {
      throw new AppError(
        503,
        "WEATHER_PROVIDER_UNAVAILABLE",
        "Weather service is temporarily unavailable.",
      );
    }

    const data = await response.json();

    return (data.results ?? []).map((location: any) => ({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
  }
}
