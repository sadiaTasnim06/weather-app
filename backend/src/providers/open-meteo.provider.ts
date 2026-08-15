import { AppError } from '../errors/AppError';
import { Weather } from '../types/weather';
import { Location } from '../types/location';
import type { WeatherProvider } from './weather.provider';
import { env } from '../config/env';
import { logger } from '../config/logger';

export class OpenMeteoProvider implements WeatherProvider {
  async searchLocations(query: string): Promise<Location[]> {
    const params = new URLSearchParams({
      name: query,
      count: '10',
      language: 'en',
      format: 'json',
    });

    const response = await fetch(
      `${env.weatherGeocodingBaseUrl}/search?${params}`,
    );

    if (!response.ok) {
      logger.error(
        {
          provider: 'open-meteo',
          operation: 'searchLocations',
          statusCode: response.status,
        },
        'Weather provider request failed',
      );

      throw new AppError(
        503,
        'WEATHER_PROVIDER_UNAVAILABLE',
        'Weather service is temporarily unavailable.',
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
  async getWeather(latitude: number, longitude: number): Promise<Weather> {
    const url = new URL(`${env.weatherApiBaseUrl}/forecast`);

    url.searchParams.set('latitude', latitude.toString());
    url.searchParams.set('longitude', longitude.toString());

    url.searchParams.set(
      'current',
      'temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code',
    );

    url.searchParams.set(
      'daily',
      'weather_code,temperature_2m_max,temperature_2m_min',
    );

    url.searchParams.set('timezone', 'auto');

    const response = await fetch(url);

    if (!response.ok) {
      logger.error(
        {
          provider: 'open-meteo',
          operation: 'getWeather',
          statusCode: response.status,
        },
        'Weather provider request failed',
      );

      throw new AppError(
        502,
        'WEATHER_PROVIDER_ERROR',
        'Weather provider request failed',
      );
    }

    const data = await response.json();

    const weather: Weather = {
      current: {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        weatherCode: data.current.weather_code,
      },

      daily: data.daily.time.map((date: string, index: number) => ({
        date,
        maxTemperature: data.daily.temperature_2m_max[index],
        minTemperature: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weather_code[index],
      })),
    };

    return weather;
  }
}
