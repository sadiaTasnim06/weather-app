import type { Weather } from "../types/weather";
import type { Location } from "../types/location";

const API_BASE_URL = "http://localhost:3000/api/v1";

export async function searchLocations(query: string): Promise<Location[]> {
  const response = await fetch(
    `${API_BASE_URL}/locations?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to search locations");
  }

  return response.json();
}
export async function getWeather(
  latitude: number,
  longitude: number,
): Promise<Weather> {
  const response = await fetch(
    `${API_BASE_URL}/weather?latitude=${latitude}&longitude=${longitude}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}
